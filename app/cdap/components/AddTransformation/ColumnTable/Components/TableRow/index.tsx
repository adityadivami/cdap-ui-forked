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

import React from 'react';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles';
import InputWidget from '../InputWidgets';
import DataQualityProgress from '../../../CircularProgressBar';
import { ITableRowProps } from '../../types';

export default function({
  onSingleSelection,
  selectedColumns,
  dataQualityValue,
  isSingleSelection,
  handleDisableCheckbox,
  onMultipleSelection,
  index,
  eachColumn,
}: ITableRowProps) {
  const classes = useStyles();
  return (
    <TableRow className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`} key={index}>
      <TableCell
        classes={{
          body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
        }}
      >
        <InputWidget
          isSingleSelection={isSingleSelection}
          selectedColumns={selectedColumns}
          onSingleSelection={onSingleSelection}
          eachColumn={eachColumn}
          handleDisableCheckbox={handleDisableCheckbox}
          onMultipleSelection={onMultipleSelection}
          index={index}
        />
      </TableCell>
      <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
        <Typography className={classes.recipeStepsActionTypeStyles}>{eachColumn.label}</Typography>
        <Typography className={classes.recipeStepsActionTypeStyles}>{eachColumn.type}</Typography>
      </TableCell>
      <TableCell className={`${classes.recipeStepsTableRowStyles} ${classes.circularBarCell}`}>
        {dataQualityValue?.length && <DataQualityProgress value={dataQualityValue[index]?.value} />}
      </TableCell>
    </TableRow>
  );
}
