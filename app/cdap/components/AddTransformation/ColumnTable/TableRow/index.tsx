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

import React from 'react';
import InputWidget from 'components/AddTransformation/ColumnTable/InputWidgets';
import DataQualityCircularProgressBar from 'components/common/DataQualityCircularProgressBar';
import { ITableRowProps } from 'components/AddTransformation/ColumnTable/types';
import { TableCellText } from 'components/common/TypographyText';
import { TableRow, TableCell } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import styled from 'styled-components';

const SelectColumnTableRow = styled(TableRow)`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
  display: grid;
  grid-template-columns: 10% 45% 45%;
  align-items: center;
  height: 100%;
`;

const SelectColumnTableBodyCell = styled(TableCell)`
  &.MuiTableCell-body {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.15px;
    color: ${grey[700]};
    padding: 5px;
    height: 64px;
  }
`;

export default function({
  onSingleSelection,
  selectedColumns,
  dataQualityValue,
  isSingleSelection,
  handleDisableCheckbox,
  onMultipleSelection,
  columnIndex,
  columnDetail,
}: ITableRowProps) {
  return (
    <SelectColumnTableRow key={`column-${columnIndex}`}>
      <SelectColumnTableBodyCell>
        <InputWidget
          isSingleSelection={isSingleSelection}
          selectedColumns={selectedColumns}
          onSingleSelection={onSingleSelection}
          columnDetail={columnDetail}
          handleDisableCheckbox={handleDisableCheckbox}
          onMultipleSelection={onMultipleSelection}
          columnIndex={columnIndex}
        />
      </SelectColumnTableBodyCell>
      <SelectColumnTableBodyCell>
        <TableCellText component="div">{columnDetail.label}</TableCellText>
        <TableCellText component="div">{columnDetail.type}</TableCellText>
      </SelectColumnTableBodyCell>
      <SelectColumnTableBodyCell>
        {dataQualityValue?.length && (
          <DataQualityCircularProgressBar
            dataQualityPercentValue={Number(dataQualityValue[columnIndex]?.value)}
          />
        )}
      </SelectColumnTableBodyCell>
    </SelectColumnTableRow>
  );
}
