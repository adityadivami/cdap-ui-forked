/*
 * Copyright © 2020 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package io.cdap.cdap.internal.app.runtime.distributed.runtimejob;

import com.google.common.base.Throwables;
import com.google.inject.Inject;
import io.cdap.cdap.api.SingleRunnableApplication;
import io.cdap.cdap.app.runtime.ProgramOptions;
import io.cdap.cdap.app.runtime.ProgramStateWriter;
import io.cdap.cdap.common.conf.CConfiguration;
import io.cdap.cdap.common.conf.Constants;
import io.cdap.cdap.common.io.Locations;
import io.cdap.cdap.common.lang.ClassLoaders;
import io.cdap.cdap.common.logging.LoggingContext;
import io.cdap.cdap.common.logging.LoggingContextAccessor;
import io.cdap.cdap.common.twill.TwillAppNames;
import io.cdap.cdap.common.utils.DirUtils;
import io.cdap.cdap.internal.app.runtime.distributed.ProgramTwillApplication;
import io.cdap.cdap.internal.app.runtime.distributed.runtime.TwillControllerFactory;
import io.cdap.cdap.internal.provision.ProvisioningService;
import io.cdap.cdap.logging.context.LoggingContextHelper;
import io.cdap.cdap.proto.id.ProgramId;
import io.cdap.cdap.proto.id.ProgramRunId;
import io.cdap.cdap.runtime.spi.ProgramRunInfo;
import io.cdap.cdap.runtime.spi.runtimejob.RuntimeJobManager;
import org.apache.hadoop.conf.Configuration;
import org.apache.twill.api.ResourceSpecification;
import org.apache.twill.api.RunId;
import org.apache.twill.api.SecureStoreUpdater;
import org.apache.twill.api.TwillApplication;
import org.apache.twill.api.TwillController;
import org.apache.twill.api.TwillPreparer;
import org.apache.twill.api.TwillRunnable;
import org.apache.twill.api.TwillRunnerService;
import org.apache.twill.api.security.SecureStoreRenewer;
import org.apache.twill.common.Cancellable;
import org.apache.twill.common.Threads;
import org.apache.twill.filesystem.LocationFactory;
import org.apache.twill.internal.io.BasicLocationCache;
import org.apache.twill.internal.io.LocationCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

/**
 * A {@link TwillRunnerService} implementations that uses {@link RuntimeJobManager} apis to
 * launch and monitor {@link TwillApplication} with single {@link TwillRunnable}.
 *
 * TODO: CDAP-16443 refactor this service for code reusability.
 */
public class RuntimeJobTwillRunnerService implements TwillRunnerService {
  private static final Logger LOG = LoggerFactory.getLogger(RuntimeJobTwillRunnerService.class);

  private final CConfiguration cConf;
  private final Configuration hConf;
  private final LocationFactory locationFactory;
  private final Map<ProgramRunId, RuntimeJobTwillController> controllers;
  private final Lock controllersLock;
  private final ProvisioningService provisioningService;
  private final ProgramStateWriter programStateWriter;
  //TODO: In memory cache. Use store once the implementation is ready
  private Map<ProgramRunId, ProgramRunInfo> storePrograms;
  private LocationCache locationCache;
  private Path cachePath;
  private ExecutorService executor;
  private ScheduledExecutorService programMonitor;

  @Inject
  RuntimeJobTwillRunnerService(CConfiguration cConf, Configuration hConf,
                               LocationFactory locationFactory, ProvisioningService provisioningService,
                               ProgramStateWriter programStateWriter) {
    this.cConf = cConf;
    this.hConf = hConf;
    this.locationFactory = locationFactory;
    this.controllers = new ConcurrentHashMap<>();
    this.controllersLock = new ReentrantLock();
    this.provisioningService = provisioningService;
    this.programStateWriter = programStateWriter;
  }

  @Override
  public void start() {
    try {
      // Use local directory for caching generated jar files
      Path tempDir = Files.createDirectories(Paths.get(cConf.get(Constants.CFG_LOCAL_DATA_DIR),
                                                       cConf.get(Constants.AppFabric.TEMP_DIR)).toAbsolutePath());
      cachePath = Files.createTempDirectory(tempDir, "runtimejob.cache");
      locationCache = new BasicLocationCache(Locations.toLocation(cachePath));
      executor = Executors.newCachedThreadPool(Threads.createDaemonThreadFactory("runtimejob-%d"));
      // Used to schedule the timeout check and cancel the startup task if timeout reached.
      programMonitor = Executors.newScheduledThreadPool(cConf.getInt(Constants.RuntimeMonitor.THREADS),
                                                        Threads.createDaemonThreadFactory("program-monitor-%d"));
      // TODO: initialize runtime store
      this.storePrograms = new HashMap<>();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void stop() {
    // Destory all the runtime job managers. This will ensure that all the resources are closed. This won't terminate
    // the remotely running program.
    for (RuntimeJobTwillController controller : controllers.values()) {
      controller.getJobManager().destroy();
    }

    try {
      if (cachePath != null) {
        DirUtils.deleteDirectoryContents(cachePath.toFile());
      }
    } catch (IOException e) {
      LOG.warn("Exception raised during stop", e);
    } finally {
      if (executor != null) {
        executor.shutdownNow();
      }
      if (programMonitor != null) {
        programMonitor.shutdownNow();
      }
    }
  }

  @Override
  public TwillPreparer prepare(TwillRunnable runnable) {
    return prepare(runnable, ResourceSpecification.BASIC);
  }

  @Override
  public TwillPreparer prepare(TwillRunnable runnable, ResourceSpecification resourceSpecification) {
    return prepare(new SingleRunnableApplication(runnable, resourceSpecification));
  }

  @Override
  public TwillPreparer prepare(TwillApplication application) {
    Configuration config = new Configuration(hConf);
    // Restrict the usage to launch user program only.
    if (!(application instanceof ProgramTwillApplication)) {
      throw new IllegalArgumentException("Only instance of ProgramTwillApplication is supported");
    }

    ProgramTwillApplication programTwillApp = (ProgramTwillApplication) application;
    ProgramRunId programRunId = programTwillApp.getProgramRunId();
    ProgramOptions programOptions = programTwillApp.getProgramOptions();
    Optional<RuntimeJobManager> runtimeJobManager = provisioningService
      .getRuntimeJobManager(programOptions, programRunId);
    if (!runtimeJobManager.isPresent()) {
      throw new RuntimeException("Runtime job manager implementation is absent. Please make sure provisioner provides" +
                                   " runtime manager implementation.");
    }
    RuntimeJobManager jobManager = runtimeJobManager.get();
    return new RuntimeJobTwillPreparer(cConf, config, application.configure(), programRunId, programOptions,
                                       locationCache, locationFactory,
                                       new ControllerFactory(programRunId, programOptions, jobManager), jobManager) {
      @Override
      public TwillController start(long timeout, TimeUnit timeoutUnit) {
        try {
          return super.start(timeout, timeoutUnit);
        } catch (Exception e) {
          deleteRunningState(programRunId);
          jobManager.destroy();
          throw e;
        }
      }
    };
  }

  @Override
  public TwillController lookup(String applicationName, RunId runId) {
    ProgramId programId = TwillAppNames.fromTwillAppName(applicationName, false);
    if (programId == null) {
      return null;
    }
    return controllers.get(programId.run(runId));
  }

  @Override
  public Iterable<TwillController> lookup(String applicationName) {
    ProgramId programId = TwillAppNames.fromTwillAppName(applicationName, false);
    if (programId == null) {
      return Collections.emptyList();
    }

    return controllers.entrySet().stream()
      .filter(entry -> programId.equals(entry.getKey().getParent()))
      .map(Map.Entry::getValue)
      .map(TwillController.class::cast)
      ::iterator;
  }

  @Override
  public Iterable<LiveInfo> lookupLive() {
    // Groups the controllers by the ProgramId, then transform it to an Iterator of LiveInfo
    return controllers.entrySet().stream()
      .collect(Collectors.groupingBy(e -> e.getKey().getParent(),
                                     Collectors.mapping(e -> TwillController.class.cast(e.getValue()),
                                                        Collectors.toList())))
      .entrySet().stream()
      .map(e -> new LiveInfo() {
        @Override
        public String getApplicationName() {
          return TwillAppNames.toTwillAppName(e.getKey());
        }

        @Override
        public Iterable<TwillController> getControllers() {
          return e.getValue();
        }
      })
      .map(LiveInfo.class::cast)
      ::iterator;
  }

  @SuppressWarnings("deprecation")
  @Override
  public Cancellable scheduleSecureStoreUpdate(SecureStoreUpdater updater, long initialDelay,
                                               long delay, TimeUnit unit) {
    // This method is deprecated and not used in CDAP
    throw new UnsupportedOperationException("The scheduleSecureStoreUpdate method is deprecated, " +
                                              "use setSecureStoreRenewer instead");
  }

  @Override
  public Cancellable setSecureStoreRenewer(SecureStoreRenewer renewer, long initialDelay, long delay,
                                           long retryDelay, TimeUnit unit) {
    return () -> { };
  }

  /**
   * Implementation of {@link TwillControllerFactory}.
   */
  private final class ControllerFactory implements TwillControllerFactory {
    private final ProgramRunId programRunId;
    private final ProgramOptions programOptions;
    private final RuntimeJobManager jobManager;

    ControllerFactory(ProgramRunId programRunId, ProgramOptions programOptions, RuntimeJobManager jobManager) {
      this.programRunId = programRunId;
      this.programOptions = programOptions;
      this.jobManager = jobManager;
    }

    @Override
    public RuntimeJobTwillController create(Callable<Void> startupTask, long timeout, TimeUnit timeoutUnit) {
      controllersLock.lock();
      try {
        RuntimeJobTwillController controller = controllers.get(programRunId);
        if (controller != null) {
          return controller;
        }

        CompletableFuture<Void> startupTaskCompletion = new CompletableFuture<>();

        // Execute the startup task if provided
        ClassLoader startupClassLoader = Optional
          .ofNullable(Thread.currentThread().getContextClassLoader())
          .orElse(getClass().getClassLoader());
        Future<?> startupTaskFuture = executor.submit(() -> {
          Map<String, String> systemArgs = programOptions.getArguments().asMap();
          LoggingContext loggingContext = LoggingContextHelper.getLoggingContextWithRunId(programRunId, systemArgs);
          Cancellable restoreContext = LoggingContextAccessor.setLoggingContext(loggingContext);
          ClassLoader oldCl = ClassLoaders.setContextClassLoader(startupClassLoader);
          try {
            startupTaskCompletion.complete(startupTask.call());
          } catch (Throwable t) {
            startupTaskCompletion.completeExceptionally(t);
          } finally {
            ClassLoaders.setContextClassLoader(oldCl);
            restoreContext.cancel();
          }
        });

        // Schedule the timeout check and cancel the startup task if timeout reached.
        programMonitor.schedule(() -> {
          if (!startupTaskFuture.isDone()) {
            startupTaskFuture.cancel(true);
            startupTaskCompletion.completeExceptionally(
              new TimeoutException("Starting of program run " + programRunId + " takes longer then "
                                     + timeout + " " + timeoutUnit.name().toLowerCase()));
          }
        }, timeout, timeoutUnit);

        // If the startup task failed, publish failure state and delete the program running state
        startupTaskCompletion.whenComplete((res, throwable) -> {
          if (throwable == null) {
            LOG.debug("Startup task completed for program run {}", programRunId);
          } else {
            LOG.error("Fail to start program run {}", programRunId, throwable);
            jobManager.destroy();
            deleteRunningState(programRunId);
            programStateWriter.error(programRunId, throwable);
          }
        });

        controller = createController(startupTaskCompletion);
        controllers.put(programRunId, controller);
        return controller;
      } catch (Exception e) {
        LOG.error("Error while getting runtime job Id for program run {}", programRunId);
        Throwables.propagate(e);
      } finally {
        controllersLock.unlock();
      }
      return null;
    }

    /**
     * Creates a new instance of {@link RuntimeJobTwillController}.
     */
    private RuntimeJobTwillController createController(CompletableFuture<Void> startupTaskCompletion) {
      // Create a new controller
      LOG.info("Creating controller for program run {}", programRunId);
      RuntimeJobTwillController controller = new RuntimeJobTwillController(jobManager, programRunId,
                                                                           startupTaskCompletion, executor);

      // When the program is completed, remove the controller from the map.
      controller.onTerminated(() -> {
        // make sure job manager is destroyed
        jobManager.destroy();
        controllers.remove(programRunId, controller);
        deleteRunningState(programRunId);
      }, Threads.SAME_THREAD_EXECUTOR);

      return controller;
    }
  }

  /**
   * Deletes the running state from store.
   */
  private void deleteRunningState(ProgramRunId programRunId) {
    storePrograms.remove(programRunId);
  }
}
