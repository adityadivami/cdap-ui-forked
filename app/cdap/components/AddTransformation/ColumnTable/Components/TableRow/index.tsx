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
import InputWidget from 'components/AddTransformation/ColumnTable/Components/InputWidgets';
import DataQualityProgress from 'components/AddTransformation/CircularProgressBar';
import { ITableRowProps } from 'components/AddTransformation/ColumnTable/types';
import { SelectColumnTableBodyCell, SelectColumnTableRow } from 'components/common/TableContainer';
import { TableCellText } from 'components/common/TypographyText';

export default function({
  onSingleSelection,
  selectedColumns,
  dataQualityValue,
  isSingleSelection,
  handleDisableCheckbox,
  onMultipleSelection,
  index,
  eachColumn,
}: ITableRowProps) {
  return (
    <SelectColumnTableRow key={index}>
      <SelectColumnTableBodyCell>
        <InputWidget
          isSingleSelection={isSingleSelection}
          selectedColumns={selectedColumns}
          onSingleSelection={onSingleSelection}
          eachColumn={eachColumn}
          handleDisableCheckbox={handleDisableCheckbox}
          onMultipleSelection={onMultipleSelection}
        />
      </SelectColumnTableBodyCell>
      <SelectColumnTableBodyCell>
        <TableCellText component="div">{eachColumn.label}</TableCellText>
        <TableCellText component="div">{eachColumn.type}</TableCellText>
      </SelectColumnTableBodyCell>
      <SelectColumnTableBodyCell>
        {dataQualityValue?.length && (
          <DataQualityProgress value={Number(dataQualityValue[index]?.value)} />
        )}
      </SelectColumnTableBodyCell>
    </SelectColumnTableRow>
  );
}
