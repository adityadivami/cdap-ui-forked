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

package co.cask.cdap.internal.app.runtime.schedule.queue;

import co.cask.cdap.api.dataset.lib.KeyValueTable;
import co.cask.cdap.api.dataset.table.Table;
import co.cask.cdap.common.conf.CConfiguration;
import co.cask.cdap.common.conf.Constants;
import co.cask.cdap.spi.data.StructuredTableAdmin;
import co.cask.cdap.spi.data.sql.PostgresSqlStructuredTableAdmin;
import co.cask.cdap.spi.data.sql.RetryingSqlTransactionRunner;
import co.cask.cdap.spi.data.sql.SqlStructuredTableRegistry;
import co.cask.cdap.spi.data.transaction.TransactionRunner;
import co.cask.cdap.store.StoreDefinition;
import com.google.common.base.Joiner;
import com.opentable.db.postgres.embedded.EmbeddedPostgres;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.rules.TemporaryFolder;

import java.io.IOException;
import javax.sql.DataSource;

/**
 *
 */
public class SqlJobQueueTableTest extends JobQueueTableTest {
  @ClassRule
  public static final TemporaryFolder TEMP_FOLDER = new TemporaryFolder();

  private static EmbeddedPostgres pg;
  private static CConfiguration cConf;

  @BeforeClass
  public static void setup() throws Exception {
    cConf = CConfiguration.create();
    // any plugin which requires transaction will be excluded
    cConf.set(Constants.REQUIREMENTS_DATASET_TYPE_EXCLUDE, Joiner.on(",").join(Table.TYPE, KeyValueTable.TYPE));
    cConf.set(Constants.Dataset.DATA_STORAGE_IMPLEMENTATION, Constants.Dataset.DATA_STORAGE_SQL);

    pg = EmbeddedPostgres.builder().setDataDirectory(TEMP_FOLDER.newFolder()).setCleanDataDirectory(false).start();
    DataSource dataSource = pg.getPostgresDatabase();
    SqlStructuredTableRegistry registry = new SqlStructuredTableRegistry(dataSource);
    registry.initialize();
    StructuredTableAdmin structuredTableAdmin = new PostgresSqlStructuredTableAdmin(registry, dataSource);

    StoreDefinition.JobQueueStore.createTables(structuredTableAdmin);
    StoreDefinition.AppMetadataStore.createTables(structuredTableAdmin);
  }

  @Override
  protected synchronized TransactionRunner newTransactionRunner() {
    try {
      DataSource dataSource = pg.getPostgresDatabase();
      SqlStructuredTableRegistry registry = new SqlStructuredTableRegistry(dataSource);
      registry.initialize();
      StructuredTableAdmin structuredTableAdmin =
        new PostgresSqlStructuredTableAdmin(registry, dataSource);
      return new RetryingSqlTransactionRunner(structuredTableAdmin, dataSource);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected CConfiguration getCConf() {
    return cConf;
  }

  @AfterClass
  public static void afterClass() throws IOException {
    pg.close();
  }
}
