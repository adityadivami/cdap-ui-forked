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

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React from 'react';
import styled from 'styled-components';

const DataTableContainer = styled(TableContainer)`
  .MuiTableCell-root {
    padding: 14px 16px;
  }

  .MuiTableCell-root:has(.MuiIconButton-root) {
    vertical-align: text-top;
  }

  .MuiTableHead-root {
    background-color: #f5f5f5;

    .MuiTypography-body1 {
      font-size: 12px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.4000000059604645px;
      text-align: left;
    }
  }
  .MuiTableBody-root {
    .MuiIconButton-root {
      display: none;
      padding: 0;
      margin-top: 4px;
    }
    .MuiTableRow-root:hover {
      background-color: #e0e0e0;

      .MuiIconButton-root {
        display: block;
      }
    }
    .MuiTypography-body1 {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0.15000000596046448px;
      text-align: left;
    }
    .MuiTypography-body2 {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.25px;
      text-align: left;
    }
  }
`;

export default function DataTable({ rows, columns }) {
  return (
    <DataTableContainer component={Paper} style={{ width: 460 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const { headerText } = column;
              return <TableCell>{headerText}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              {columns.map((column) => {
                const { name } = column;
                return <TableCell>{row[name]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableContainer>
  );
}
