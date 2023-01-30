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

export const GridContainer = styled.div`
  height: 188px;
`;

// the !important is used where higher specificity is not working due to pre-defined inline styles on the components
export const StyledDataGrid = styled(DataGrid)`
  &&& {
    width: 460px;

    & .MuiDataGrid-cell {
      width: auto !important;
      padding: 14px 16px;
      font-size: 16px;
      font-weight: 400;
      outline: none;
      padding-left: 16px;
      padding-right: 16px;

      max-height: none !important;
      min-height: auto !important;
      line-height: unset !important;
    }

    .MuiDataGrid-columnHeader {
      outline: none;
      padding-left: 16px;
    }

    .MuiDataGrid-columnHeaderTitle {
      font-weight: 700;
      font-size: 12px;
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
      max-height: none !important;
      min-height: auto !important;
    }

    .MuiTypography-body1 {
      white-space: break-spaces;
      font-size: 16px;
    }

    .MuiDataGrid-row {
      max-height: none !important;
      min-height: auto !important;
    }

    .MuiDataGrid-viewport {
      max-height: none !important;
      min-height: auto !important;
    }

    .MuiDataGrid-renderingZone {
      max-height: unset !important;
      min-height: auto !important;
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
