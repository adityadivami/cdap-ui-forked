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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export const DataTableContainer = styled(TableContainer)`
  .MuiTableCell-root {
    padding: 14px 16px;
  }
  .MuiTableHead-root {
    background-color: #f5f5f5;
    .MuiTypography-body1 {
      font-size: 12px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.4px;
      text-align: left;
    }
  }

  .MuiTableBody-root {
    .MuiTableRow-root:hover {
      background-color: #e0e0e0;
    }
    .MuiTypography-body1 {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0.15px;
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

export default function DataTable({ rows, columns, TableContainer }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const { headerText, name } = column;
              return <TableCell key={`data-table-head-cell-${name}`}>{headerText}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={`data-table-body-row-${rowIndex}`}>
              {columns.map((column) => {
                const { name } = column;
                return <TableCell key={`data-table-body-cell-${name}`}>{row[name]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
