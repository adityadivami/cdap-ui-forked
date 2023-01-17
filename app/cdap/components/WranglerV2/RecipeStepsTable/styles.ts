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

import grey from '@material-ui/core/colors/grey';
import { DataGrid } from '@material-ui/data-grid';
import styled from 'styled-components';

export const StyledDataGrid = styled(DataGrid)`
  &&& {
    width: 460px;

    .MuiDataGrid-cell {
      padding-left: 16px;
      padding-right: 16px;
    }

    .MuiDataGrid-columnHeader {
      padding-left: 16px;
    }

    .MuiDataGrid-columnHeaderTitleContainer {
      padding: 0px;
    }

    .MuiDataGrid-columnHeaderWrapper {
      justify-content: space-evenly;
      background-color: ${grey[100]};
    }

    .MuiDataGrid-columnSeparator {
      display: none;
    }

    .MuiDataGrid-row {
      width: 460px;
    }

    .MuiDataGrid-row:hover {
      background-color: ${grey[300]};

      .MuiButtonBase-root {
        display: block;
      }

      .MuiTypography-root {
        width: 328px;
      }
    }

    .MuiIconButton-root {
      padding: 0px;
      align-self: flex-start;
    }

    .MuiTypography-body1 {
      white-space: break-spaces;
    }
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .MuiButtonBase-root {
    display: none;
  }
`;
