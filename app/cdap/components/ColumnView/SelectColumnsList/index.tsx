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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { HoverDots } from './icons';

const SelectColumnsList = (props) => {
  const { columnData, dataQuality, searchTerm, modifyColumnsHandler } = props;
  const [filteredColumns, setFilteredColumns] = useState(columnData);
  const classes = useStyles();
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality);

  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, [filteredColumns]);

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

  const handleDragEnd = (e) => {
    if (!e.destination) {
      return;
    }
    const tempData = Array.from(filteredColumns);
    const [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    modifyColumnsHandler(e.source.index, e.destination.index);
    setFilteredColumns(tempData);
  };
  console.log(dataQuality, 'data quality');

  return (
    <section className={classes.columnsCountTextStyles}>
      <TableContainer component={Box} classes={{ root: classes.customTableContainer }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Table aria-label="recipe steps table" stickyHeader>
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.recipeStepsTableRowStyles}>
                <TableCell className={classes.columnLeft}>
                  {`${COLUMNS} (${columnData.length})`}
                </TableCell>
                <TableCell className={classes.columnRight}>{NULL_VALUES}</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody
                  className={classes.tableBody}
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                >
                  {filteredColumns.map((eachColumn, index) => (
                    <Draggable
                      key={eachColumn.label}
                      draggableId={eachColumn.label}
                      index={index}
                      isDragDisabled={searchTerm ? true : false}
                    >
                      {(provider) => (
                        <TableRow
                          key={index}
                          className={classes.tableRowContainer}
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                        >
                          <TableCell className={classes.leftSideCell} {...provider.dragHandleProps}>
                            <Box className={classes.cellContainer}>
                              <Box className={searchTerm ? classes.hideIcon : classes.showIcon}>
                                {HoverDots}
                              </Box>
                              <Box>
                                {eachColumn.label}
                                &nbsp;
                                <br />
                                {eachColumn.type}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell className={classes.nullValuesContainer}>
                            {dataQualityValue?.length && (
                              <DataQualityProgress value={dataQualityValue[index]?.value} />
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </TableContainer>
    </section>
  );
};

export default SelectColumnsList;
