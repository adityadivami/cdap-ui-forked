/*
 * Copyright © 2018 Cask Data, Inc.
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

package co.cask.cdap.internal.provision;

import co.cask.cdap.api.dataset.lib.CounterTimeseriesTable;
import co.cask.cdap.api.dataset.lib.IndexedObjectStore;
import co.cask.cdap.api.dataset.lib.IndexedTable;
import co.cask.cdap.api.dataset.lib.KeyValueTable;
import co.cask.cdap.api.dataset.lib.ObjectMappedTable;
import co.cask.cdap.api.dataset.lib.ObjectStore;
import co.cask.cdap.api.dataset.lib.PartitionedFileSet;
import co.cask.cdap.api.dataset.lib.TimePartitionedFileSet;
import co.cask.cdap.api.dataset.lib.TimeseriesTable;
import co.cask.cdap.api.dataset.lib.cube.Cube;
import co.cask.cdap.api.dataset.table.Table;
import co.cask.cdap.data2.dataset2.lib.external.ExternalDataset;
import co.cask.cdap.proto.profile.Profile;
import co.cask.cdap.runtime.spi.provisioner.Capabilities;
import co.cask.cdap.runtime.spi.provisioner.Cluster;
import co.cask.cdap.runtime.spi.provisioner.ClusterStatus;
import co.cask.cdap.runtime.spi.provisioner.PollingStrategies;
import co.cask.cdap.runtime.spi.provisioner.PollingStrategy;
import co.cask.cdap.runtime.spi.provisioner.Provisioner;
import co.cask.cdap.runtime.spi.provisioner.ProvisionerContext;
import co.cask.cdap.runtime.spi.provisioner.ProvisionerSpecification;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Native provisioner that doesn't provision a cluster
 */
public class NativeProvisioner implements Provisioner {

  public static final ProvisionerSpecification SPEC = new ProvisionerSpecification(
    Profile.NATIVE_NAME, "Native", "Runs programs on the CDAP master cluster. Does not provision any resources.");
  public static final Capabilities SYSTEM_DATASETS =
    new Capabilities(Stream.of(Table.TYPE, KeyValueTable.TYPE, ObjectMappedTable.TYPE, ObjectStore.TYPE,
                               IndexedObjectStore.TYPE, IndexedTable.TYPE, TimeseriesTable.TYPE,
                               CounterTimeseriesTable.TYPE, TimePartitionedFileSet.TYPE, PartitionedFileSet.TYPE,
                               ExternalDataset.TYPE, Cube.TYPE)
                       .collect(Collectors.toSet()));

  @Override
  public ProvisionerSpecification getSpec() {
    return SPEC;
  }

  @Override
  public void validateProperties(Map<String, String> properties) {
    // no-op
  }

  @Override
  public Cluster createCluster(ProvisionerContext context) {
    return new Cluster(context.getProgramRun().getRun(), ClusterStatus.RUNNING,
                       Collections.emptyList(), Collections.emptyMap());
  }

  @Override
  public ClusterStatus getClusterStatus(ProvisionerContext context, Cluster cluster) {
    ClusterStatus status = cluster.getStatus();
    return status == ClusterStatus.DELETING ? ClusterStatus.NOT_EXISTS : status;
  }

  @Override
  public Cluster getClusterDetail(ProvisionerContext context, Cluster cluster) {
    return new Cluster(cluster, getClusterStatus(context, cluster));
  }

  @Override
  public void deleteCluster(ProvisionerContext context, Cluster cluster) {
    // no-op
  }

  @Override
  public PollingStrategy getPollingStrategy(ProvisionerContext context, Cluster cluster) {
    // shouldn't matter, as we won't ever poll
    return PollingStrategies.fixedInterval(2, TimeUnit.SECONDS);
  }

  @Override
  public Capabilities getCapabilities() {
    return SYSTEM_DATASETS;
  }
}
