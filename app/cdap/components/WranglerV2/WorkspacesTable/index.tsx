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

import { StyledDataGrid } from 'components/WranglerV2/RecipeStepsTable/styles';
import React from 'react';
import styled from 'styled-components';
import { IRecipeStepsColumns } from '../RecipeStepsTable';

export interface IWorkspacesRows {
  id: number;
  connectionName: string;
  connectionType: string;
  datasetName: string;
  nullValues: string;
  steps: string;
}

interface WorkspacesTableProps {
  columns: IRecipeStepsColumns[];
  rows: IWorkspacesRows[];
}

const WorkspaceDataGrid = styled(StyledDataGrid)`
  &&& {
    width: 1306px;

    .MuiDataGrid-row:hover {
      .MuiButtonBase-root {
        display: none;
      }
    }
  }
`;

export default function WorspacesTable({ rows, columns }: WorkspacesTableProps) {
  return (
    <WorkspaceDataGrid
      autoHeight
      columns={columns}
      disableColumnMenu
      headerHeight={48}
      hideFooter
      rows={rows}
    />
  );
}
