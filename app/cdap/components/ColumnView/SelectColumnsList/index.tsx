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
import React, { useEffect, useState } from 'react';
import { COLUMNS, NULL_VALUES } from 'components/ColumnView/constants';
import { useStyles } from 'components/ColumnView/SelectColumnsList/styles';
import { prepareDataQualtiy } from 'components/ColumnView/SelectColumnsList/utils';
import { ISelectColumnListProps } from 'components/ColumnView/SelectColumnsList/types';
import DataQualityCircularProgressBar from 'components/ColumnView/SelectColumnsList/DataQualityCircularProgressBar';

export default function({ columnData, dataQuality, searchTerm }: ISelectColumnListProps) {
  const classes = useStyles();
  const [filteredColumns, setFilteredColumns] = useState(columnData);
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality);

  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const columnValue =
        Array.isArray(columnData) &&
        columnData.length &&
        columnData.filter((el) => el?.label.toLowerCase().includes(searchTerm.toLowerCase()));
      if (columnValue?.length) {
        setFilteredColumns(columnValue);
      } else {
        setFilteredColumns([]);
      }
    } else {
      setFilteredColumns(columnData);
    }
  }, [searchTerm]);

  return (
    <section className={classes.columnsCountTextStyles}>
      <TableContainer component={Box} classes={{ root: classes.customTableContainer }}>
        <Table aria-label="recipe steps table" stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.recipeStepsTableRowStyles}>
              <TableCell className={classes.columnLeft}>
                {`${COLUMNS} (${columnData?.length})`}
              </TableCell>
              <TableCell className={classes.columnRight}>{NULL_VALUES}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {Array.isArray(filteredColumns) &&
              filteredColumns.length &&
              filteredColumns.map((eachColumn, index) => (
                <>
                  <TableRow key={index} className={classes.tableRowContainer}>
                    <TableCell className={classes.leftSideCell}>
                      <Box>
                        {eachColumn?.label}
                        &nbsp;
                        <br />
                        {eachColumn?.type}
                      </Box>
                    </TableCell>
                    <TableCell className={classes.nullValuesContainer}>
                      {dataQualityValue.length && (
                        <DataQualityCircularProgressBar
                          dataQualityPercentValue={dataQualityValue[index]?.value as number}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
