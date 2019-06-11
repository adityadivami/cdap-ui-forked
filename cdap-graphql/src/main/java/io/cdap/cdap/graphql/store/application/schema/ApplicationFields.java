/*
 *
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

package io.cdap.cdap.graphql.store.application.schema;

import io.cdap.cdap.graphql.schema.Fields;

/**
 * Helper class with a collection of fields relevant to applications that are used in the server
 */
public class ApplicationFields implements Fields {

  public static final String APPLICATIONS = "applications";
  public static final String APPLICATION = "application";
  public static final String PROGRAMS = "programs";
  public static final String APPLICATION_DETAIL = "applicationDetail";
  public static final String METADATA = "metadata";
  public static final String APP_VERSION = "appVersion";
  public static final String DESCRIPTION = "description";
  public static final String CONFIGURATION = "configuration";
  public static final String OWNER_PRINCIPAL = "ownerPrincipal";
  public static final String TYPE = "type";
  public static final String VERSION = "version";

  private ApplicationFields() {
    throw new UnsupportedOperationException("Helper class should not be instantiated");
  }

}
