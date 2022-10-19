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
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from '../styles';
import { SearchIcon } from '../iconStore';
import { prepareDataQualtiy } from '../CircularProgressBar/utils';
import DataQualityProgress from '../CircularProgressBar';
import { NoDataSVG } from 'components/GridTable/iconStore';
import { multipleColumnSelected } from '../constants';
import T from 'i18n-react';
import { ISelectMultipleColumnList } from './types';
import { IHeaderNamesList, IDataQuality } from '../types';

export default function({
  directiveFunctionSupportedDataType,
  selectedColumnsCount,
  columnData,
  setSelectedColumns,
  dataQuality,
  functionName,
}: ISelectMultipleColumnList) {
  const [columns, setColumns] = useState(columnData as IHeaderNamesList[]);
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality as IDataQuality[]);
  const [selectedColumns, setSelectedColumn] = useState([] as IHeaderNamesList[]);
  const [focused, setFocused] = useState<boolean>(false);
  const classes = useStyles();
  const ref = useRef(null);
  const no_match =
    directiveFunctionSupportedDataType.length > 0
      ? !directiveFunctionSupportedDataType.includes('all')
      : false
      ? columns.filter((object1) => {
          return directiveFunctionSupportedDataType.some((object2) => {
            return object2.includes(object1.type[0].toLowerCase());
          });
        })
      : [];
  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>, column: IHeaderNamesList) => {
    if (event.target.checked) {
      setSelectedColumns((prev) => [...prev, column]);
      setSelectedColumn([...selectedColumns, column]);
    } else {
      const indexOfUnchecked = selectedColumns.findIndex((el) => el.label === column.label);
      if (indexOfUnchecked > -1) {
        const clone_columns = [...selectedColumns];
        const remaining_col = clone_columns.splice(indexOfUnchecked, 1);
        setSelectedColumns(clone_columns);
        setSelectedColumn(clone_columns);
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const columnValue: IHeaderNamesList[] = columnData.filter((el) =>
        el?.label.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (columnValue?.length) {
        setColumns(columnValue);
      } else {
        setColumns([]);
      }
    } else {
      setColumns(columnData);
    }
  };

  const handleFocus = () => {
    ref?.current?.focus();
    setFocused(true);
  };

  const handleDisableCheckbox = () => {
    const multiSelect = multipleColumnSelected.filter(
      (el) => el.value == functionName && el.isMoreThanTwo
    );
    if (selectedColumns.length === 0 || selectedColumns.length < 2) {
      return false;
    } else if (multiSelect.length) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className={classes.columnsCountTextStyles}>
      <div className={classes.selectColumnsHeaderStyles}>
        <div>
          {selectedColumnsCount
            ? selectedColumnsCount > 10
              ? selectedColumnsCount
              : `${T.translate('features.WranglerNewSelectCoulmnList.zero')}${selectedColumnsCount}`
            : `${T.translate('features.WranglerNewSelectCoulmnList.no')}`}
          &nbsp;{T.translate('features.WranglerNewAddTransformation.columnsSelected')}
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
            {SearchIcon}
          </Box>
        </div>
      </div>
      {Array.isArray(no_match) && no_match.length === 0 ? (
        <Box className={classes.noRecordWrapper}>
          <Box className={classes.innerWrapper}>
            {NoDataSVG}
            <Typography className={classes.mainHeaderMessage}>
              {T.translate('features.WranglerNewSelectCoulmnList.noColumns')}
            </Typography>
            <Typography className={classes.subHeaderMessage}>
              {T.translate('features.WranglerNewSelectCoulmnList.noMatchColumnDatatype')}
            </Typography>
          </Box>
        </Box>
      ) : (
        <TableContainer component={Box}>
          <Table aria-label="recipe steps table">
            <TableHead>
              <TableRow className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}>
                <TableCell classes={{ head: classes.recipeStepsTableHeadStyles }}></TableCell>
                <TableCell classes={{ head: classes.recipeStepsTableHeadStyles }}>
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
              {columns.map((eachColumn, index) => {
                if (directiveFunctionSupportedDataType.includes('all')) {
                  return (
                    <TableRow
                      className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}
                      key={index}
                    >
                      <TableCell
                        classes={{
                          body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                        }}
                      >
                        <FormControlLabel
                          disabled={
                            selectedColumns.filter((el) => el.label === eachColumn.label).length ||
                            !handleDisableCheckbox()
                              ? false
                              : true
                          }
                          control={
                            <Checkbox
                              color="primary"
                              checked={
                                selectedColumns.filter((el) => el.label === eachColumn.label).length
                                  ? true
                                  : false
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                onSelect(event, eachColumn)
                              }
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.label}
                        </Typography>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.type}
                        </Typography>
                      </TableCell>
                      <TableCell
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
                  directiveFunctionSupportedDataType.includes(eachColumn?.type[0]?.toLowerCase())
                ) {
                  return (
                    <TableRow
                      className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}
                      key={index}
                    >
                      <TableCell
                        classes={{
                          body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                        }}
                      >
                        <FormControlLabel
                          disabled={
                            selectedColumns.filter((el) => el.label === eachColumn.label).length ||
                            !handleDisableCheckbox()
                              ? false
                              : true
                          }
                          control={
                            <Checkbox
                              color="primary"
                              checked={
                                selectedColumns.filter((el) => el.label === eachColumn.label).length
                                  ? true
                                  : false
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                onSelect(event, eachColumn)
                              }
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.label}
                        </Typography>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.type}
                        </Typography>
                      </TableCell>
                      <TableCell
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
