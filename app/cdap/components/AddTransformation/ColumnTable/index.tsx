/*
 * Copyright © 2022 Cask Data, Inc.
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { useStyles } from '../styles';
import T from 'i18n-react';
import TableRowWidget from './Components/TableRow';
import { IColumnTableProps } from './types';

export default function({
  columns,
  directiveFunctionSupportedDataType,
  onSingleSelection,
  selectedColumns,
  dataQualityValue,
  isSingleSelection,
  handleDisableCheckbox,
  onMultipleSelection,
}: IColumnTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Box}>
      <Table aria-label="recipe steps table" className={classes.tabledisplayStyles}>
        <TableHead>
          <TableRow className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}>
            <TableCell
              classes={{
                head: `${classes.recipeStepsTableHeadStyles} ${classes.columnstyles}`,
              }}
            ></TableCell>
            <TableCell
              classes={{
                head: `${classes.recipeStepsTableHeadStyles} ${classes.nullValueHead}`,
              }}
            >
              {T.translate('features.WranglerNewAddTransformation.columns')}
            </TableCell>
            <TableCell
              classes={{
                head: `${classes.recipeStepsTableHeadStyles} ${classes.nullValueHead}`,
              }}
            >
              {T.translate('features.WranglerNewAddTransformation.nullValues')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(columns) &&
            columns.length > 0 &&
            columns.map((eachColumn, index) =>
              Array.isArray(directiveFunctionSupportedDataType) &&
              directiveFunctionSupportedDataType.includes('all') ? (
                <TableRowWidget
                  onSingleSelection={onSingleSelection}
                  selectedColumns={selectedColumns}
                  dataQualityValue={dataQualityValue}
                  isSingleSelection={isSingleSelection}
                  handleDisableCheckbox={handleDisableCheckbox}
                  onMultipleSelection={onMultipleSelection}
                  index={index}
                  eachColumn={eachColumn}
                />
              ) : directiveFunctionSupportedDataType?.includes(
                  eachColumn?.type[0]?.toLowerCase()
                ) ? (
                <TableRowWidget
                  onSingleSelection={onSingleSelection}
                  selectedColumns={selectedColumns}
                  dataQualityValue={dataQualityValue}
                  isSingleSelection={isSingleSelection}
                  handleDisableCheckbox={handleDisableCheckbox}
                  onMultipleSelection={onMultipleSelection}
                  index={index}
                  eachColumn={eachColumn}
                />
              ) : (
                <></>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
