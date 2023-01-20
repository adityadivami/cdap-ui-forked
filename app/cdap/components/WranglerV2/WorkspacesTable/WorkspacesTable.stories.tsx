/*
 * Copyright © 2023 Cask Data, Inc.
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

import { action } from '@storybook/addon-actions';
import { IRecipeStepsColumns } from 'components/WranglerV2/RecipeStepsTable/index';
import WorspacesTable, { IWorkspacesRows } from 'components/WranglerV2/WorkspacesTable';
import React from 'react';

export default {
  title: 'WorkspacesTable',
  component: WorkspacesList,
};

const dataGridColumns: IRecipeStepsColumns[] = [
  {
    field: 'connectionType',
    headerName: 'Connection Type',
    sortable: false,
    width: 156,
  },
  {
    field: 'datasetName',
    headerName: 'Dataset Name',
    sortable: false,
    width: 376,
  },
  {
    field: 'connectionName',
    headerName: 'Connection Name',
    sortable: false,
    width: 376,
  },
  {
    field: 'steps',
    headerName: 'Steps',
    sortable: false,
    width: 168,
  },
  {
    field: 'nullValues',
    headerName: 'Null Values',
    sortable: false,
    width: 200,
  },
];

const dataGridRows: IWorkspacesRows[] = [
  {
    id: 1,
    connectionType: '',
    datasetName: 'IndiaSales_DataTable2',
    connectionName: 'SQL_Connection123',
    steps: '14',
    nullValues: '0%',
  },
  {
    id: 2,
    connectionType: '',
    datasetName: 'USASales_Data92USASales_Data92USASales_Data92USASales_Data92',
    connectionName:
      'Connection_Sales_BigConnection_Sales_BigConnection_Sales_BigConnection_Sales_Big',
    steps: '15',
    nullValues: '31%',
  },
  {
    id: 3,
    connectionType: '',
    datasetName: 'UK_Salesdata UK_Salesdata UK_Salesdata UK_Salesdata UK_Salesdata',
    connectionName:
      'Connection_185_Kafka2 Connection_185_Kafka2 Connection_185_Kafka2 Connection_185_Kafka2',
    steps: '18',
    nullValues: '0%',
  },
  {
    id: 4,
    connectionType: '',
    datasetName: 'IndiaSales_DataTable3',
    connectionName: 'Connection_Sales_GCS',
    steps: '21',
    nullValues: '79%',
  },
  {
    id: 5,
    connectionType: '',
    datasetName: 'Germany_Salesdata',
    connectionName: 'Connection_Sales_Big',
    steps: '14',
    nullValues: '20%',
  },
  {
    id: 6,
    connectionType: '',
    datasetName: 'IndiaSales_DataTable2',
    connectionName: 'SalesOracle_server',
    steps: '11',
    nullValues: '0%',
  },
];

export function WorkspacesList() {
  return <WorspacesTable columns={dataGridColumns} rows={dataGridRows} />;
}
