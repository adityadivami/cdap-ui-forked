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
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { COLUMNS, COLUMNS_SELECTED, NULL_VALUES } from '../constants';
import { useStyles } from '../styles';
import { SearchIcon } from '../iconStore';
import { prepareDataQualtiy } from '../CircularProgressBar/utils';
import DataQualityProgress from '../CircularProgressBar';
import { NoDataSVG } from 'components/GridTable/iconStore';
import T from 'i18n-react';

export default function(props) {
  const {
    directiveFunctionSupportedDataType,
    selectedColumnsCount,
    columnData,
    setSelectedColumns,
    dataQuality,
    is_secondSelection,
    setSelectedColumns_2,
    selected_column_2,
    selectedColumns_1,
  } = props;
  const [columns, setColumns] = useState(columnData);
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality);
  const [selectedColumns, setSelectedColumn] = useState([]);
  const [focused, setFocused] = useState(false);
  const classes = useStyles();
  const ref = useRef(null);
  const no_match =
    directiveFunctionSupportedDataType?.length > 0 &&
    directiveFunctionSupportedDataType?.includes('all')
      ? directiveFunctionSupportedDataType?.filter((el) => el == 'all')
      : columns.filter((object1) => {
          return directiveFunctionSupportedDataType?.some((object2) => {
            return object2.includes(object1.type[0].toLowerCase());
          });
        });
  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const onSelect = (event, label, column) => {
    if (is_secondSelection) {
      setSelectedColumns_2([column]);
      setSelectedColumn([column]);
    } else {
      setSelectedColumns([column]);
      setSelectedColumn([column]);
    }
  };

  const handleSearch = (event) => {
    if (event.target.value) {
      const columnValue = columnData.filter((el) =>
        el?.label.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (columnValue.length) {
        setColumns(columnValue);
      } else {
        setColumns([]);
      }
    } else {
      setColumns(columnData);
    }
  };

  const handleFocus = () => {
    ref?.current.focus();
    setFocused(true);
  };

  return (
    <section className={classes.columnsCountTextStyles}>
      <div className={classes.selectColumnsHeaderStyles}>
        <div>
          {selectedColumnsCount
            ? selectedColumnsCount > 10
              ? selectedColumnsCount
              : `0${selectedColumnsCount}`
            : 'No '}{' '}
          &nbsp;{COLUMNS_SELECTED}
        </div>
        <div className={classes.searchFormControl}>
          <input
            className={focused ? classes.isFocused : classes.isBlurred}
            onChange={handleSearch}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Box className={classes.searchInputAdornment} onClick={handleFocus}>
            {SearchIcon()}
          </Box>
        </div>
      </div>
      {no_match.length === 0 ? (
        <Box className={classes.noRecordWrapper}>
          <Box className={classes.innerWrapper}>
            {NoDataSVG}
            <Typography className={classes.mainHeaderMessage}>No columns to show</Typography>
            <Typography className={classes.subHeaderMessage}>
              Selected directive supported datatype does not match which the column's datatype
            </Typography>
          </Box>
        </Box>
      ) : (
        <TableContainer component={Box}>
          <Table aria-label="recipe steps table" className={classes.tabledisplayStyles}>
            <TableHead>
              <TableRow className={classes.recipeStepsTableRowStyles}>
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
                  {NULL_VALUES}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {columns.map((eachColumn, index) => {
                if (directiveFunctionSupportedDataType?.includes('all')) {
                  if (!is_secondSelection) {
                    return (
                      <TableRow className={classes.recipeStepsTableBodyRowStyles} key={index}>
                        <TableCell
                          classes={{
                            body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                          }}
                        >
                          <Radio
                            color="primary"
                            onChange={(e) => onSelect(e, eachColumn.label, eachColumn)}
                            checked={
                              selectedColumns.filter((el) => el.label == eachColumn.label).length
                                ? true
                                : false
                            }
                          />
                        </TableCell>
                        <TableCell
                          classes={{ body: classes.recipeStepsTableRowStyles }}
                          style={{ width: 50 }}
                          // component="th"
                          // scope="row"
                        >
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.label}
                          </Typography>
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.type}
                          </Typography>
                        </TableCell>
                        <TableCell
                          // className={[classes.recipeStepsTableRowStyles, classes.displayNone].join(' ')}
                          className={[
                            classes.recipeStepsTableRowStyles,
                            classes.circularBarCell,
                          ].join(' ')}
                        >
                          {dataQualityValue?.length && (
                            <DataQualityProgress value={dataQualityValue[index]?.value} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  } else if (
                    is_secondSelection &&
                    selectedColumns_1.length &&
                    eachColumn.label !== selectedColumns_1[0].label
                  ) {
                    return (
                      <TableRow className={classes.recipeStepsTableBodyRowStyles} key={index}>
                        <TableCell
                          classes={{
                            body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                          }}
                        >
                          <Radio
                            color="primary"
                            onChange={(e) => onSelect(e, eachColumn.label, eachColumn)}
                            checked={
                              selectedColumns.filter((el) => el.label == eachColumn.label).length
                                ? true
                                : false
                            }
                          />
                        </TableCell>
                        <TableCell
                          classes={{ body: classes.recipeStepsTableRowStyles }}
                          style={{ width: 50 }}
                          // component="th"
                          // scope="row"
                        >
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.label}
                          </Typography>
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.type}
                          </Typography>
                        </TableCell>
                        <TableCell
                          // className={[classes.recipeStepsTableRowStyles, classes.displayNone].join(' ')}
                          className={[
                            classes.recipeStepsTableRowStyles,
                            classes.circularBarCell,
                          ].join(' ')}
                        >
                          {dataQualityValue?.length && (
                            <DataQualityProgress value={dataQualityValue[index]?.value} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                } else if (
                  directiveFunctionSupportedDataType?.includes(eachColumn?.type[0]?.toLowerCase())
                ) {
                  if (!is_secondSelection) {
                    return (
                      <TableRow className={classes.recipeStepsTableBodyRowStyles} key={index}>
                        <TableCell
                          classes={{
                            body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                          }}
                        >
                          <Radio
                            color="primary"
                            onChange={(e) => onSelect(e, eachColumn.label, eachColumn)}
                            checked={
                              selectedColumns.filter((el) => el.label == eachColumn.label).length
                                ? true
                                : false
                            }
                          />
                        </TableCell>
                        <TableCell
                          classes={{ body: classes.recipeStepsTableRowStyles }}
                          style={{ width: 50 }}
                          // component="th"
                          // scope="row"
                        >
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.label}
                          </Typography>
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.type}
                          </Typography>
                        </TableCell>
                        <TableCell
                          // className={[classes.recipeStepsTableRowStyles, classes.displayNone].join(' ')}
                          className={[
                            classes.recipeStepsTableRowStyles,
                            classes.circularBarCell,
                          ].join(' ')}
                        >
                          {dataQualityValue?.length && (
                            <DataQualityProgress value={dataQualityValue[index]?.value} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  } else if (
                    is_secondSelection &&
                    selectedColumns_1.length &&
                    eachColumn.label !== selectedColumns_1[0].label
                  ) {
                    return (
                      <TableRow className={classes.recipeStepsTableBodyRowStyles} key={index}>
                        <TableCell
                          classes={{
                            body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                          }}
                        >
                          <Radio
                            color="primary"
                            onChange={(e) => onSelect(e, eachColumn.label, eachColumn)}
                            checked={
                              selectedColumns.filter((el) => el.label == eachColumn.label).length
                                ? true
                                : false
                            }
                          />
                        </TableCell>
                        <TableCell
                          classes={{ body: classes.recipeStepsTableRowStyles }}
                          style={{ width: 50 }}
                          // component="th"
                          // scope="row"
                        >
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.label}
                          </Typography>
                          <Typography className={classes.recipeStepsActionTypeStyles}>
                            {eachColumn.type}
                          </Typography>
                        </TableCell>
                        <TableCell
                          // className={[classes.recipeStepsTableRowStyles, classes.displayNone].join(' ')}
                          className={[
                            classes.recipeStepsTableRowStyles,
                            classes.circularBarCell,
                          ].join(' ')}
                        >
                          {dataQualityValue?.length && (
                            <DataQualityProgress value={dataQualityValue[index]?.value} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
