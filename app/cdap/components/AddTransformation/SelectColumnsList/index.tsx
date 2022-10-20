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

import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from '../styles';
import { SearchIcon } from '../iconStore';
import { NoDataSVG } from 'components/GridTable/iconStore';
import T from 'i18n-react';
import { ISelectColumnList } from './types';
import { IHeaderNamesList } from '../types';
import ColumnTable from '../ColumnTable';
import { multipleColumnSelected } from '../constants';
import SelectedColumnCountWidget from '../SelectedColumnCountWidget';

export default function({
  directiveFunctionSupportedDataType,
  selectedColumnsCount,
  columnData,
  setSelectedColumns,
  dataQuality,
  functionName,
}: ISelectColumnList) {
  const [columns, setColumns] = useState(columnData as IHeaderNamesList[]);
  const [selectedColumns, setSelectedColumn] = useState([] as IHeaderNamesList[]);
  const [focused, setFocused] = useState<boolean>(false);
  const [isSingleSelection, setIsSingleSelection] = useState<boolean>(true);
  const classes = useStyles();
  const ref = useRef(null);

  useEffect(() => {
    const multiSelect = multipleColumnSelected.filter((el) => el.value == functionName);
    if (multiSelect.length) {
      setIsSingleSelection(false);
    }
  }, []);

  const columnsAsPerType: IHeaderNamesList[] | string[] =
    directiveFunctionSupportedDataType?.length > 0 &&
    directiveFunctionSupportedDataType?.includes('all')
      ? directiveFunctionSupportedDataType?.filter((el) => el == 'all')
      : columns?.filter((object1) => {
          return directiveFunctionSupportedDataType?.some((object2) => {
            return object2?.includes(object1?.type[0]?.toLowerCase());
          });
        });

  const onSingleSelection = (column: IHeaderNamesList) => {
    setSelectedColumns([column]);
    setSelectedColumn([column]);
  };

  const onMultipleSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    column: IHeaderNamesList
  ) => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const columnValue: IHeaderNamesList[] =
        Array.isArray(columnData) && columnData.length
          ? columnData.filter((el) =>
              el?.label.toLowerCase().includes(event.target.value.toLowerCase())
            )
          : [];
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

  return (
    <section className={classes.columnsCountTextStyles}>
      <div className={classes.selectColumnsHeaderStyles}>
        <SelectedColumnCountWidget selectedColumnsCount={selectedColumns.length} />
        <div className={classes.searchFormControl}>
          <input
            data-testid="input_id"
            className={focused ? classes.isFocused : classes.isBlurred}
            onChange={handleSearch}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Box className={classes.searchInputAdornment} onClick={handleFocus} data-testid='click-handle-focus'>
            {SearchIcon}
          </Box>
        </div>
      </div>
      {Array.isArray(columnsAsPerType) && columnsAsPerType.length === 0 ? (
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
        <ColumnTable
          dataQualityValue={dataQuality}
          onSingleSelection={onSingleSelection}
          handleDisableCheckbox={handleDisableCheckbox}
          onMultipleSelection={onMultipleSelection}
          columns={columns}
          directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
          isSingleSelection={isSingleSelection}
          selectedColumns={selectedColumns}
        />
      )}
    </section>
  );
}
