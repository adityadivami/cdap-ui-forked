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

package co.cask.cdap.data2.nosql;

import co.cask.cdap.api.data.DatasetContext;
import co.cask.cdap.api.data.DatasetInstantiationException;
import co.cask.cdap.spi.data.StructuredTable;
import co.cask.cdap.spi.data.StructuredTableContext;
import co.cask.cdap.spi.data.StructuredTableInstantiationException;
import co.cask.cdap.spi.data.TableNotFoundException;
import co.cask.cdap.spi.data.table.StructuredTableId;
import co.cask.cdap.spi.data.table.StructuredTableSchema;
import co.cask.cdap.spi.data.table.StructuredTableSpecification;

/**
 * The nosql context to get the table.
 */
public class NoSqlStructuredTableContext implements StructuredTableContext {
  private final NoSqlStructuredTableAdmin tableAdmin;
  private final DatasetContext datasetContext;

  NoSqlStructuredTableContext(NoSqlStructuredTableAdmin tableAdmin, DatasetContext datasetContext) {
    this.tableAdmin = tableAdmin;
    this.datasetContext = datasetContext;
  }

  @Override
  public StructuredTable getTable(StructuredTableId tableId)
    throws StructuredTableInstantiationException, TableNotFoundException {
    try {
      StructuredTableSpecification specification = tableAdmin.getSpecification(tableId);
      if (specification == null) {
        throw new TableNotFoundException(tableId);
      }
      return new NoSqlStructuredTable(datasetContext.getDataset(NoSqlStructuredTableAdmin.ENTITY_TABLE_NAME),
                                      new StructuredTableSchema(specification));
    } catch (DatasetInstantiationException e) {
      throw new StructuredTableInstantiationException(
        tableId, String.format("Error instantiating table %s", tableId), e);
    }
  }
}
