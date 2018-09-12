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
 *
 */

package co.cask.cdap.internal.provision;

import co.cask.cdap.common.conf.CConfiguration;
import co.cask.cdap.common.conf.Constants;
import co.cask.cdap.common.utils.ProjectInfo;
import co.cask.cdap.runtime.spi.provisioner.ProvisionerSystemContext;

import java.util.Collections;
import java.util.Map;

/**
 * Context for initializing a provisioner.
 */
public class DefaultSystemProvisionerContext implements ProvisionerSystemContext {
  private final Map<String, String> properties;
  private final String cdapVersion;

  DefaultSystemProvisionerContext(CConfiguration cConf, String provisionerName) {
    String prefix = String.format("%s%s.", Constants.Provisioner.SYSTEM_PROPERTY_PREFIX, provisionerName);
    this.properties = Collections.unmodifiableMap(cConf.getPropsWithPrefix(prefix));
    this.cdapVersion = ProjectInfo.getVersion().toString();
  }

  @Override
  public Map<String, String> getProperties() {
    return properties;
  }

  @Override
  public String getCDAPVersion() {
    return cdapVersion;
  }
}
