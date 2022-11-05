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
import { useStyles } from 'components/AddTransformation/styles';
import { SearchIcon } from 'components/AddTransformation/iconStore';
import { NoDataSVG } from 'components/GridTable/iconStore';
import T from 'i18n-react';
import { ISelectColumnListProps } from 'components/AddTransformation/SelectColumnsList/types';
import { IHeaderNamesList } from 'components/AddTransformation/types';
import ColumnTable from 'components/AddTransformation/ColumnTable';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import SelectedColumnCountWidget from 'components/AddTransformation/SelectedColumnCountWidget';
import { IMultipleSelectedFunctionDetail } from 'components/AddTransformation/types';
import { SELECT_COLUMN_LIST_PREFIX } from 'components/AddTransformation/constants';

export default function({
  directiveFunctionSupportedDataType,
  selectedColumnsCount,
  columnData,
  setSelectedColumns,
  dataQuality,
  functionName,
}: ISelectColumnListProps) {
  const [columns, setColumns] = useState<IHeaderNamesList[]>(columnData);
  const [selectedColumns, setSelectedColumn] = useState<IHeaderNamesList[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [isSingleSelection, setIsSingleSelection] = useState<boolean>(true);
  const classes = useStyles();
  const ref = useRef(null);

  useEffect(() => {
    const multiSelect: IMultipleSelectedFunctionDetail[] = multipleColumnSelected?.filter(
      (functionDetail: IMultipleSelectedFunctionDetail) => functionDetail.value === functionName
    );
    if (multiSelect.length) {
      setIsSingleSelection(false);
    }
  }, []);

  const columnsAsPerType: IHeaderNamesList[] | string[] =
    directiveFunctionSupportedDataType?.length > 0 &&
    directiveFunctionSupportedDataType?.includes('all')
      ? directiveFunctionSupportedDataType?.filter(
          (supportedType: string) => supportedType === 'all'
        )
      : columns?.filter((columnDetail: IHeaderNamesList) => {
          return directiveFunctionSupportedDataType?.some(
            (dataTypeCollection: string | string[]) => {
              return dataTypeCollection?.includes(columnDetail?.type[0]?.toLowerCase());
            }
          );
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
      const indexOfUnchecked = selectedColumns.findIndex(
        (columnDetail) => columnDetail.label === column.label
      );
      if (indexOfUnchecked > -1) {
        setSelectedColumns(() => selectedColumns.filter((_, index) => index !== indexOfUnchecked));
        setSelectedColumn(() => selectedColumns.filter((_, index) => index !== indexOfUnchecked));
      }
    }
  };

  const handleDisableCheckbox = () => {
    const multiSelect: IMultipleSelectedFunctionDetail[] = multipleColumnSelected.filter(
      (functionDetail: IMultipleSelectedFunctionDetail) =>
        functionDetail.value === functionName && functionDetail.isMoreThanTwo
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
      const columnValue: IHeaderNamesList[] = columnData.length
        ? columnData.filter((columnDetail: IHeaderNamesList) =>
            columnDetail.label.toLowerCase().includes(event.target.value.toLowerCase())
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
    <section className={classes.columnsCountTextStyles} data-testid='select-column-list-parent'>
      <div className={classes.selectColumnsHeaderStyles}>
        <SelectedColumnCountWidget selectedColumnsCount={selectedColumnsCount} />
        <div className={classes.searchFormControl}>
          <input
            data-testid="input_id"
            className={focused ? classes.isFocused : classes.isBlurred}
            onChange={handleSearch}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Box
            className={classes.searchInputAdornment}
            onClick={handleFocus}
            data-testid="click-handle-focus"
          >
            {SearchIcon}
          </Box>
        </div>
      </div>
      {Array.isArray(columnsAsPerType) && columnsAsPerType.length === 0 ? (
        <Box className={classes.noRecordWrapper}>
          <Box className={classes.innerWrapper}>
            {NoDataSVG}
            <Typography component="div" className={classes.mainHeaderMessage}>
              {T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noColumns`)}
            </Typography>
            <Typography component="div" className={classes.subHeaderMessage}>
              {T.translate(
                `${SELECT_COLUMN_LIST_PREFIX}.noMatchColumnDatatype`
              )}
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
