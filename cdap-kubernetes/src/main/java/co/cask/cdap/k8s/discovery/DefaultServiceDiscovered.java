/*
 * Copyright © 2019 Cask Data, Inc.
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

package co.cask.cdap.k8s.discovery;

import com.google.common.collect.Lists;
import org.apache.twill.common.Cancellable;
import org.apache.twill.discovery.Discoverable;
import org.apache.twill.discovery.ServiceDiscovered;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * A default implementation of {@link ServiceDiscovered}.
 *
 * This implementation is copied from Twill with small modification as cleanup.
 * The one in Twill is in protected package and also in the twill-discovery-core
 * module, which will bring in dependencies that is conflicting with kubernetes.
 */
final class DefaultServiceDiscovered implements ServiceDiscovered {

  private static final Logger LOG = LoggerFactory.getLogger(DefaultServiceDiscovered.class);

  private final String name;
  private final AtomicReference<Set<Discoverable>> discoverables;
  private final List<ListenerCaller> listenerCallers;
  private final ReadWriteLock callerLock;

  DefaultServiceDiscovered(String name) {
    this.name = name;
    this.discoverables = new AtomicReference<>(Collections.emptySet());
    this.listenerCallers = Lists.newLinkedList();
    this.callerLock = new ReentrantReadWriteLock();
  }

  void setDiscoverables(Set<Discoverable> discoverables) {
    Set<Discoverable> newDiscoverables = Collections.unmodifiableSet(new HashSet<>(discoverables));
    Set<Discoverable> oldDiscoverables = this.discoverables.getAndUpdate(old -> newDiscoverables);
    if (oldDiscoverables.equals(newDiscoverables)) {
      return;
    }

    LOG.debug("Discoverables for service {} changed from {} to {}", name, oldDiscoverables, newDiscoverables);

    // Collect all listeners with a read lock to the listener list.
    List<ListenerCaller> callers = Lists.newArrayList();
    Lock readLock = callerLock.readLock();
    readLock.lock();
    try {
      callers.addAll(listenerCallers);
    } finally {
      readLock.unlock();
    }

    // Invoke listeners.
    for (ListenerCaller caller : callers) {
      caller.invoke();
    }
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public Cancellable watchChanges(ChangeListener listener, Executor executor) {
    ListenerCaller caller = new ListenerCaller(listener, executor);

    // Add the new listener with a write lock.
    Lock writeLock = callerLock.writeLock();
    writeLock.lock();
    try {
      listenerCallers.add(caller);
    } finally {
      writeLock.unlock();
    }

    // Invoke listener for the first time.
    // Race would happen between this method and the setDiscoverables() method, but it's ok as the contract of
    // adding a new listener is that onChange will be called at least once. The actual changes is already
    // reflected by the atomic reference "discoverables", hence it's consistent.
    caller.invoke();
    return caller;
  }

  @Override
  public boolean contains(Discoverable discoverable) {
    // If the name doesn't match, it shouldn't be in the list.
    return discoverable.getName().equals(name) && discoverables.get().contains(discoverable);
  }

  @Override
  public Iterator<Discoverable> iterator() {
    return discoverables.get().iterator();
  }

  /**
   * Private helper class for invoking the change listener from an executor.
   * It also responsible to remove itself from the listener list.
   */
  private final class ListenerCaller implements Runnable, Cancellable {

    private final ChangeListener listener;
    private final Executor executor;
    private final AtomicBoolean cancelled;

    private ListenerCaller(ChangeListener listener, Executor executor) {
      this.listener = listener;
      this.executor = executor;
      this.cancelled = new AtomicBoolean(false);
    }

    void invoke() {
      if (!cancelled.get()) {
        executor.execute(this);
      }
    }

    @Override
    public void run() {
      if (!cancelled.get()) {
        listener.onChange(DefaultServiceDiscovered.this);
      }
    }

    @Override
    public void cancel() {
      if (cancelled.compareAndSet(false, true)) {
        Lock writeLock = callerLock.writeLock();
        writeLock.lock();
        try {
          listenerCallers.remove(this);
        } finally {
          writeLock.unlock();
        }
      }
    }
  }
}
