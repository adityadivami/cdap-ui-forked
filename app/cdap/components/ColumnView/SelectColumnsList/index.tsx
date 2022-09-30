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
import { COLUMNS, NULL_VALUES } from '../constants';
import { useStyles } from './styles';
import { prepareDataQualtiy } from './CircularProgressBar/utils';
import DataQualityProgress from './CircularProgressBar';

const SelectColumnsList = (props) => {
  const { columnData, dataQuality, searchTerm } = props;
  const [filteredColumns, setFilteredColumns] = useState(columnData);
  const classes = useStyles();
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality);

  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const columnValue = columnData.filter((el) =>
        el?.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (columnValue.length) {
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
                {`${COLUMNS} (${columnData.length})`}
              </TableCell>
              <TableCell className={classes.columnRight}>{NULL_VALUES}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {filteredColumns.map((eachColumn, index) => (
              <>
                <TableRow key={index} className={classes.tableRowContainer}>
                  <TableCell className={classes.leftSideCell}>
                    <Box>
                      {eachColumn.label}
                      &nbsp;
                      <br />
                      {eachColumn.type}
                    </Box>
                  </TableCell>
                  <TableCell className={classes.nullValuesContainer}>
                    {dataQualityValue?.length && (
                      <DataQualityProgress value={dataQualityValue[index]?.value} />
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
};

export default SelectColumnsList;
