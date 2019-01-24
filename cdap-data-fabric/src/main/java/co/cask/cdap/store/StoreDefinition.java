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

package co.cask.cdap.store;

import co.cask.cdap.common.AlreadyExistsException;
import co.cask.cdap.spi.data.InvalidFieldException;
import co.cask.cdap.spi.data.StructuredTableAdmin;
import co.cask.cdap.spi.data.table.StructuredTableId;
import co.cask.cdap.spi.data.table.StructuredTableSpecification;
import co.cask.cdap.spi.data.table.field.Fields;

import java.io.IOException;

/**
 * A class which contains all the store definition, the table name the store will use, the schema of the table should
 * all be specified here.
 * TODO: CDAP-14674 Make sure all the store definition goes here.
 */
public final class StoreDefinition {
  private StoreDefinition() {
    // prevent instantiation
  }

  /**
   * Create all system tables.
   *
   * @param tableAdmin the table admin to create the table
   */
  public static void createAllTables(StructuredTableAdmin tableAdmin) throws IOException, AlreadyExistsException {
    if (tableAdmin.getSpecification(ArtifactStore.ARTIFACT_DATA_TABLE) == null) {
      ArtifactStore.createTables(tableAdmin);
    }
  }

  /**
   *
   */
  public static final class ArtifactStore {
    public static final StructuredTableId ARTIFACT_DATA_TABLE = new StructuredTableId("artifact_data");
    public static final StructuredTableId APP_DATA_TABLE = new StructuredTableId("app_data");
    public static final StructuredTableId PLUGIN_DATA_TABLE = new StructuredTableId("plugin_data");
    public static final StructuredTableId UNIV_PLUGIN_DATA_TABLE = new StructuredTableId("universal_plugin_data");

    public static final String NAMESPACE_FIELD = "namespace";
    public static final String ARTIFACT_NAMESPACE_FIELD = "artifact_namespace";
    public static final String ARTIFACT_NAME_FIELD = "artifact_name";
    public static final String ARTIFACT_VER_FIELD = "artifiact_version";
    public static final String ARTIFACT_DATA_FIELD = "artifact_data";
    public static final String CLASS_NAME_FIELD = "class_name";
    public static final String APP_DATA_FIELD = "app_data";
    public static final String PARENT_NAMESPACE_FIELD = "parent_namespace";
    public static final String PARENT_NAME_FIELD = "parent_name";
    public static final String PLUGIN_TYPE_FIELD = "plugin_type";
    public static final String PLUGIN_NAME_FIELD = "plugin_name";
    public static final String PLUGIN_DATA_FIELD = "plugin_data";

    // Artifact Data table
    public static final StructuredTableSpecification ARTIFACT_DATA_SPEC = new StructuredTableSpecification.Builder()
      .withId(ARTIFACT_DATA_TABLE)
      .withFields(Fields.stringType(ARTIFACT_NAMESPACE_FIELD),
                  Fields.stringType(ARTIFACT_NAME_FIELD),
                  Fields.stringType(ARTIFACT_VER_FIELD),
                  Fields.stringType(ARTIFACT_DATA_FIELD))
      .withPrimaryKeys(ARTIFACT_NAMESPACE_FIELD, ARTIFACT_NAME_FIELD, ARTIFACT_VER_FIELD)
      .build();

    // App Data table
    public static final StructuredTableSpecification APP_DATA_SPEC =
      new StructuredTableSpecification.Builder()
        .withId(APP_DATA_TABLE)
        .withFields(Fields.stringType(NAMESPACE_FIELD),
                    Fields.stringType(CLASS_NAME_FIELD),
                    Fields.stringType(ARTIFACT_NAMESPACE_FIELD),
                    Fields.stringType(ARTIFACT_NAME_FIELD),
                    Fields.stringType(ARTIFACT_VER_FIELD),
                    Fields.stringType(APP_DATA_FIELD))
        .withPrimaryKeys(NAMESPACE_FIELD, CLASS_NAME_FIELD, ARTIFACT_NAMESPACE_FIELD, ARTIFACT_NAME_FIELD,
                         ARTIFACT_VER_FIELD)
        .build();

    // Plugin Data table
    public static final StructuredTableSpecification PLUGIN_DATA_SPEC =
      new StructuredTableSpecification.Builder()
        .withId(PLUGIN_DATA_TABLE)
        .withFields(Fields.stringType(PARENT_NAMESPACE_FIELD),
                    Fields.stringType(PARENT_NAME_FIELD),
                    Fields.stringType(PLUGIN_TYPE_FIELD),
                    Fields.stringType(PLUGIN_NAME_FIELD),
                    Fields.stringType(ARTIFACT_NAMESPACE_FIELD),
                    Fields.stringType(ARTIFACT_NAME_FIELD),
                    Fields.stringType(ARTIFACT_VER_FIELD),
                    Fields.stringType(PLUGIN_DATA_FIELD))
        .withPrimaryKeys(PARENT_NAMESPACE_FIELD, PARENT_NAME_FIELD, PLUGIN_TYPE_FIELD, PLUGIN_NAME_FIELD,
                         ARTIFACT_NAMESPACE_FIELD, ARTIFACT_NAME_FIELD, ARTIFACT_VER_FIELD)
        .build();
    

    // Universal Plugin Data table
    public static final StructuredTableSpecification UNIV_PLUGIN_DATA_SPEC =
      new StructuredTableSpecification.Builder()
        .withId(UNIV_PLUGIN_DATA_TABLE)
        .withFields(Fields.stringType(NAMESPACE_FIELD),
                    Fields.stringType(PLUGIN_TYPE_FIELD),
                    Fields.stringType(PLUGIN_NAME_FIELD),
                    Fields.stringType(ARTIFACT_NAMESPACE_FIELD),
                    Fields.stringType(ARTIFACT_NAME_FIELD),
                    Fields.stringType(ARTIFACT_VER_FIELD),
                    Fields.stringType(PLUGIN_DATA_FIELD))
        .withPrimaryKeys(NAMESPACE_FIELD, PLUGIN_TYPE_FIELD, PLUGIN_NAME_FIELD,
                         ARTIFACT_NAMESPACE_FIELD, ARTIFACT_NAME_FIELD, ARTIFACT_VER_FIELD)
        .build();

    public static void createTables(StructuredTableAdmin tableAdmin) throws IOException, AlreadyExistsException {
      tableAdmin.create(ARTIFACT_DATA_SPEC);
      tableAdmin.create(APP_DATA_SPEC);
      tableAdmin.create(PLUGIN_DATA_SPEC);
      tableAdmin.create(UNIV_PLUGIN_DATA_SPEC);
    }
  }
}
