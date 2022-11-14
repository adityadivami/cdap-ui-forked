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

import { TableBody, Checkbox, Divider } from '@material-ui/core';
import React from 'react';
import T from 'i18n-react';
import TableRowWidget from 'components/AddTransformation/ColumnTable/Components/TableRow';
import { IColumnTableProps } from 'components/AddTransformation/ColumnTable/types';
import { ADD_TRANSFORMATION_PREFIX } from 'components/AddTransformation/constants';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import {
  SelectColumnTableContainer,
  SelectColumnTable,
  SelectColumnTableHead,
  SelectColumnTableRow,
  SelectColumnTableHeadCell,
} from 'components/common/TableContainer';

export default function({
  columns,
  transformationDataType,
  onSingleSelection,
  selectedColumns,
  dataQualityValue,
  isSingleSelection,
  handleDisableCheckbox,
  onMultipleSelection,
  totalColumnCount,
  setSelectedColumns,
  transformationName,
}: IColumnTableProps) {
  const handleChange = () => {
    if (
      multipleColumnSelected?.filter(
        (option) => option.value === transformationName && option.isMoreThanTwo === false
      ).length > 0
    ) {
      if (selectedColumns?.length) {
        setSelectedColumns([]);
      } else {
        columns?.length > 2 ? setSelectedColumns(columns.slice(0, 2)) : setSelectedColumns(columns);
      }
    } else {
      if (selectedColumns?.length) {
        setSelectedColumns([]);
      } else {
        setSelectedColumns(columns);
      }
    }
  };

  return (
    <SelectColumnTableContainer data-testid="column-table-parent">
      <SelectColumnTable aria-label="recipe steps table">
        <Divider />
        <SelectColumnTableHead>
          <SelectColumnTableRow>
            <SelectColumnTableHeadCell>
              {multipleColumnSelected?.filter((option) => option.value === transformationName)
                .length > 0 && (
                <Checkbox
                  color="primary"
                  checked={selectedColumns?.length ? true : false}
                  onChange={handleChange}
                  indeterminate={selectedColumns?.length ? true : false}
                />
              )}
            </SelectColumnTableHeadCell>
            <SelectColumnTableHeadCell data-testid="panel-columns">
              {T.translate(`${ADD_TRANSFORMATION_PREFIX}.columns`)}
              {`(${totalColumnCount})`}
            </SelectColumnTableHeadCell>
            <SelectColumnTableHeadCell data-testid="panel-values">
              {T.translate(`${ADD_TRANSFORMATION_PREFIX}.nullValues`)}
            </SelectColumnTableHeadCell>
          </SelectColumnTableRow>
        </SelectColumnTableHead>
        <Divider />
        <TableBody>
          {columns?.length > 0 &&
            columns.map((eachColumn, index) => (
              <>
                {transformationDataType?.includes('all') ? (
                  <TableRowWidget
                    onSingleSelection={onSingleSelection}
                    selectedColumns={selectedColumns}
                    dataQualityValue={dataQualityValue}
                    isSingleSelection={isSingleSelection}
                    handleDisableCheckbox={handleDisableCheckbox}
                    onMultipleSelection={onMultipleSelection}
                    index={index}
                    eachColumn={eachColumn}
                  />
                ) : (
                  transformationDataType?.includes(eachColumn?.type[0]?.toLowerCase()) && (
                    <TableRowWidget
                      onSingleSelection={onSingleSelection}
                      selectedColumns={selectedColumns}
                      dataQualityValue={dataQualityValue}
                      isSingleSelection={isSingleSelection}
                      handleDisableCheckbox={handleDisableCheckbox}
                      onMultipleSelection={onMultipleSelection}
                      index={index}
                      eachColumn={eachColumn}
                    />
                  )
                )}
              </>
            ))}
        </TableBody>
      </SelectColumnTable>
    </SelectColumnTableContainer>
  );
}
