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

import { TableBody, Checkbox, Divider, Box } from '@material-ui/core';
import React from 'react';
import T from 'i18n-react';
import TableRowWidget from 'components/WranglerGrid/SelectColumnPanel/DataTable/TableRow';
import { IColumnTableProps } from 'components/WranglerGrid/SelectColumnPanel/DataTable/types';
import {
  ADD_TRANSFORMATION_PREFIX,
  SELECT_COLUMN_LIST_PREFIX,
} from 'components/WranglerGrid/SelectColumnPanel/constants';
import { MULTI_SELECTION_COLUMN } from 'components/WranglerGrid/SelectColumnPanel/constants';
import { TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import styled, { css } from 'styled-components';
import { NormalFont, SubHeadBoldFont } from 'components/common/TypographyText';
import { NoDataSVG } from 'components/GridTable/iconStore';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';

const StyledTableContainer = styled(TableContainer)`
  height: 100%;
`;

const StyledTable = styled(Table)`
  display: flex;
  flex-direction: column;
`;

const StyledTableHead = styled(TableHead)`
  height: 54px;
`;

const CellFontCSS = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const StyledTableRow = styled(TableRow)`
  ${CellFontCSS}
  color: ${grey[700]};
  display: grid;
  grid-template-columns: 8% 45% 45%;
  align-items: center;
  height: 100%;
`;

const StyledTableHeadCell = styled(TableCell)`
  &.MuiTableCell-head {
    ${CellFontCSS}
    padding: 0;
    color: ${grey[900]};
    border-bottom: none !important;
  }
`;

const FlexWrapper = styled(Box)`
  display: flex;
  height: 100%;
  align-items: center;
`;

const CenterAlignWrapper = styled(Box)`
  text-align: center;
`;

export default function ({
  columns,
  transformationDataType,
  handleSingleSelection,
  selectedColumns,
  dataQualityValue,
  isSingleSelection,
  handleDisableCheckbox,
  handleMultipleSelection,
  setSelectedColumns,
  transformationName,
}: IColumnTableProps) {

  const indexOfMultiSelectOption = MULTI_SELECTION_COLUMN?.findIndex(
    (option) => option.value === transformationName && option.isMoreThanTwo === false
  )

  const handleChange = () => {
    if (indexOfMultiSelectOption > -1) {
      if (selectedColumns.length) {
        setSelectedColumns([]);
      } else {
        columns?.length > 2 ? setSelectedColumns(columns.slice(0, 2)) : setSelectedColumns(columns);
      }
    } else {
      selectedColumns?.length ? setSelectedColumns([]) : setSelectedColumns(columns);
    }
  };

  const getColumnsToDisplay = () => {
    if (transformationDataType?.includes('all')) return columns;
    return columns.filter((eachColumn) =>
      transformationDataType?.includes(eachColumn?.type[0]?.toLowerCase())
    );
  }

  const columnsToDisplay: IHeaderNamesList[] = getColumnsToDisplay()

  return (
    <StyledTableContainer data-testid="column-table-parent">
      {columnsToDisplay.length === 0 && (
        <FlexWrapper>
          <CenterAlignWrapper>
            {NoDataSVG}
            <SubHeadBoldFont component="p" data-testid="no-column-title">
              {T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noColumns`)}
            </SubHeadBoldFont>
            <NormalFont component="p" data-testid="no-column-subTitle">
              {T.translate(`${SELECT_COLUMN_LIST_PREFIX}.noMatchColumnDatatype`)}
            </NormalFont>
          </CenterAlignWrapper>
        </FlexWrapper>
      )}
      {columnsToDisplay.length > 0 && <StyledTable aria-label="recipe steps table">
        <Divider />
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableHeadCell>
              {MULTI_SELECTION_COLUMN?.findIndex((option) => option.value === transformationName)
                > -1 && (
                  <Checkbox
                    color="primary"
                    checked={selectedColumns?.length ? true : false}
                    onClick={handleChange}
                    indeterminate={selectedColumns?.length ? true : false}
                    data-testid="column-table-check-box"
                  />
                )}
            </StyledTableHeadCell>
            <StyledTableHeadCell data-testid="panel-columns">
              {T.translate(`${ADD_TRANSFORMATION_PREFIX}.columns`)}
              {` (${columns.length})`}
            </StyledTableHeadCell>
            <StyledTableHeadCell data-testid="panel-values">
              {T.translate(`${ADD_TRANSFORMATION_PREFIX}.nullValues`)}
            </StyledTableHeadCell>
          </StyledTableRow>
        </StyledTableHead>
        <Divider />
        <TableBody>
          {columnsToDisplay.map((eachColumn, columnIndex) => (
            <TableRowWidget
              handleSingleSelection={handleSingleSelection}
              selectedColumns={selectedColumns}
              dataQualityValue={dataQualityValue}
              isSingleSelection={isSingleSelection}
              handleDisableCheckbox={handleDisableCheckbox}
              handleMultipleSelection={handleMultipleSelection}
              columnIndex={columnIndex}
              columnDetail={eachColumn}
            />
          ))}
        </TableBody>
      </StyledTable>
      }
    </StyledTableContainer>
  );
}
