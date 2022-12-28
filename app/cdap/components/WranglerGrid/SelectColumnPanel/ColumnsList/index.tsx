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

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { NoDataSVG } from 'components/GridTable/iconStore';
import T from 'i18n-react';
import { IColumnsListProps } from 'components/WranglerGrid/SelectColumnPanel/ColumnsList/types';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';
import DataTable from 'components/WranglerGrid/SelectColumnPanel/DataTable';
import { MULTI_SELECTION_COLUMN } from 'components/WranglerGrid/SelectColumnPanel/constants';
import CountWidget from 'components/WranglerGrid/SelectColumnPanel/CountWidget';
import { IMultipleSelectedFunctionDetail } from 'components/WranglerGrid/SelectColumnPanel/types';
import { SELECT_COLUMN_LIST_PREFIX } from 'components/WranglerGrid/SelectColumnPanel/constants';
import { NormalFont, SubHeadBoldFont } from 'components/common/TypographyText';
import {ColumnWrapper, CenterAlignBox, FlexWrapper, ColumnInnerWrapper, SearchWrapper, StyledSearchIcon, SearchInputField, SearchIconButton } from 'components/WranglerGrid/SelectColumnPanel/ColumnsList/styles'

export default function ({
  transformationDataType,
  selectedColumnsCount,
  columnsList,
  setSelectedColumns,
  dataQuality,
  transformationName,
  selectedColumns,
  columnsAsPerType,
  filteredColumnsOnType
}: IColumnsListProps) {
  const [columns, setColumns] = useState(columnsList);
  const [isSingleSelection, setIsSingleSelection] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const multiSelect = MULTI_SELECTION_COLUMN?.findIndex(
      (functionDetail: IMultipleSelectedFunctionDetail) =>
        functionDetail.value === transformationName
    );

    if (multiSelect > -1) {
      setIsSingleSelection(false);
    }
    setColumns(filteredColumnsOnType);
  }, []);

  const handleMultipleSelection = (
    event: ChangeEvent<HTMLInputElement>,
    column: IHeaderNamesList
  ) => {
    if (event.target.checked) {
      setSelectedColumns((prev) => [...prev, column]);
    } else {
      const indexOfUnchecked = selectedColumns.findIndex(
        (columnDetail) => columnDetail.label === column.label
      );
      indexOfUnchecked > -1 && setSelectedColumns(() => selectedColumns.filter((_, index) => index !== indexOfUnchecked));
    }
  };

  const handleDisableCheckbox = () => {
    const multiSelect = MULTI_SELECTION_COLUMN.findIndex(
      (functionDetail: IMultipleSelectedFunctionDetail) =>
        functionDetail.value === transformationName && functionDetail.isMoreThanTwo
    );
    if (selectedColumns?.length === 0 || selectedColumns?.length < 2 || multiSelect > -1) return false;
    return true;
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      let columnValue: IHeaderNamesList[] = []
      if (filteredColumnsOnType.length) {
        columnValue = filteredColumnsOnType.filter((columnDetail: IHeaderNamesList) =>
          columnDetail.label.toLowerCase().includes(event.target.value.toLowerCase())
        )
      }
      columnValue.length ? setColumns(columnValue) : setColumns([]);
    } else {
      setColumns(filteredColumnsOnType);
    }
  };

  const handleFocus = () => {
    ref?.current?.focus();
  };

  return (
    <ColumnWrapper data-testid="select-column-list-parent">
      {columnsAsPerType.length === 0 && (
        <FlexWrapper>
          <CenterAlignBox>
            {NoDataSVG}
            <SubHeadBoldFont component="p" data-testid="no-column-title">
              {T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noColumns`)}
            </SubHeadBoldFont>
            <NormalFont component="p" data-testid="no-column-subTitle">
              {T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noMatchColumnDatatype`)}
            </NormalFont>
          </CenterAlignBox>
        </FlexWrapper>
      )}
      {columnsAsPerType.length > 0 && (
        <>
          <ColumnInnerWrapper>
            <CountWidget selectedColumnsCount={selectedColumnsCount} />
            <SearchWrapper>
              <SearchInputField
                data-testid="input-search-id"
                onChange={handleSearch}
                ref={ref}
              />
              <SearchIconButton onClick={handleFocus} data-testid="click-handle-focus">
                <StyledSearchIcon />
              </SearchIconButton>
            </SearchWrapper>
          </ColumnInnerWrapper>
          <DataTable
            dataQualityValue={dataQuality}
            handleSingleSelection={(column)=> setSelectedColumns([column])}
            handleDisableCheckbox={handleDisableCheckbox}
            handleMultipleSelection={handleMultipleSelection}
            columns={columnsAsPerType.length === 0 ? [] : columns}
            transformationDataType={transformationDataType}
            isSingleSelection={isSingleSelection}
            selectedColumns={selectedColumns}
            totalColumnCount={columnsAsPerType?.length}
            setSelectedColumns={setSelectedColumns}
            transformationName={transformationName}
          />
        </>
      )}
    </ColumnWrapper>
  );
}
