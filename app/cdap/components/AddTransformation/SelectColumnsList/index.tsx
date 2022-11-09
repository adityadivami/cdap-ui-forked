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

import { Box } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from 'components/AddTransformation/SelectColumnsList/styles';
import { SearchIcon } from 'components/AddTransformation/iconStore';
import { NoDataSVG } from 'components/GridTable/iconStore';
import T from 'i18n-react';
import { ISelectColumnsListProps } from 'components/AddTransformation/SelectColumnsList/types';
import { IHeaderNamesList } from 'components/AddTransformation/types';
import ColumnTable from 'components/AddTransformation/ColumnTable';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import SelectedColumnCountWidget from 'components/AddTransformation/SelectedColumnCountWidget';
import { IMultipleSelectedFunctionDetail } from 'components/AddTransformation/types';
import { SELECT_COLUMN_LIST_PREFIX } from 'components/AddTransformation/constants';
import TypographyText from 'components/common/TypographyText';
import BoxContainer from 'components/common/BoxContainer';

export default function({
  transformationDataType,
  selectedColumnsCount,
  columnsList,
  setSelectedColumns,
  dataQuality,
  transformationName,
  selectedColumns,
}: ISelectColumnListProps) {
  const [columns, setColumns] = useState<IHeaderNamesList[]>(columnsList);
  const [focused, setFocused] = useState<boolean>(false);
  const [isSingleSelection, setIsSingleSelection] = useState<boolean>(true);
  const classes = useStyles();
  const ref = useRef(null);

  useEffect(() => {
    const multiSelect: IMultipleSelectedFunctionDetail[] = multipleColumnSelected?.filter(
      (functionDetail: IMultipleSelectedFunctionDetail) =>
        functionDetail.value === transformationName
    );
    if (multiSelect.length) {
      setIsSingleSelection(false);
    }
  }, []);

  const columnsAsPerType: IHeaderNamesList[] | string[] =
    transformationDataType?.length > 0 && transformationDataType?.includes('all')
      ? transformationDataType?.filter((supportedType: string) => supportedType === 'all')
      : columns?.filter((columnDetail: IHeaderNamesList) => {
          return transformationDataType?.some((dataTypeCollection: string | string[]) => {
            return dataTypeCollection?.includes(columnDetail?.type[0]?.toLowerCase());
          });
        });

  const onSingleSelection = (column: IHeaderNamesList) => {
    setSelectedColumns([column]);
  };

  const onMultipleSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    column: IHeaderNamesList
  ) => {
    if (event.target.checked) {
      setSelectedColumns((prev) => [...prev, column]);
    } else {
      const indexOfUnchecked = selectedColumns.findIndex(
        (columnDetail) => columnDetail.label === column.label
      );
      if (indexOfUnchecked > -1) {
        setSelectedColumns(() => selectedColumns.filter((_, index) => index !== indexOfUnchecked));
      }
    }
  };

  const handleDisableCheckbox = () => {
    const multiSelect: IMultipleSelectedFunctionDetail[] = multipleColumnSelected.filter(
      (functionDetail: IMultipleSelectedFunctionDetail) =>
        functionDetail.value === transformationName && functionDetail.isMoreThanTwo
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
      const columnValue: IHeaderNamesList[] = columnsList.length
        ? columnsList.filter((columnDetail: IHeaderNamesList) =>
            columnDetail.label.toLowerCase().includes(event.target.value.toLowerCase())
          )
        : [];
      if (columnValue?.length) {
        setColumns(columnValue);
      } else {
        setColumns([]);
      }
    } else {
      setColumns(columnsList);
    }
  };

  const handleFocus = () => {
    ref?.current?.focus();
    setFocused(true);
  };

  return (
    <BoxContainer type="SimpleBox" dataTestId="select-column-list-parent" height="90%">
      <BoxContainer type="FlexBox" justifyContent="space-between">
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
      </BoxContainer>
      {Array.isArray(columnsAsPerType) && columnsAsPerType.length === 0 ? (
        <BoxContainer type="FlexBox" height="100%" margin="30px 0 0 0">
          <BoxContainer type="SimpleBox" textAlign="center">
            {NoDataSVG}
            <TypographyText
              type="simpleBold"
              text={T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noColumns`).toString()}
              component="p"
              size="16px"
              weight={600}
              dataTestId="no-column-title"
            />
            <TypographyText
              type="simpleBold"
              text={T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noMatchColumnDatatype`).toString()}
              component="p"
              size="14px"
              weight={400}
              dataTestId="no-column-subTitle"
            />
          </BoxContainer>
        </BoxContainer>
      ) : (
        <ColumnTable
          dataQualityValue={dataQuality}
          onSingleSelection={onSingleSelection}
          handleDisableCheckbox={handleDisableCheckbox}
          onMultipleSelection={onMultipleSelection}
          columns={columns}
          transformationDataType={transformationDataType}
          isSingleSelection={isSingleSelection}
          selectedColumns={selectedColumns}
          totalColumnCount={columnsList?.length}
          setSelectedColumns={setSelectedColumns}
          transformationName={transformationName}
        />
      )}
    </BoxContainer>
  );
}
