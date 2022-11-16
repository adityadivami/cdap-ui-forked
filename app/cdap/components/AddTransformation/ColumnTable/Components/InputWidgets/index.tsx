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
import RadioInput from 'components/AddTransformation/ColumnTable/Components/RadioInput';
import CheckboxInput from 'components/AddTransformation/ColumnTable/Components/CheckboxInput';
import { IInputWidgetProps } from 'components/AddTransformation/ColumnTable/types';

export default function({
  isSingleSelection,
  selectedColumns,
  onSingleSelection,
  columnDetail,
  handleDisableCheckbox,
  onMultipleSelection,
}: IInputWidgetProps) {
  return (
    <>
      {isSingleSelection ? (
        <RadioInput
          selectedColumns={selectedColumns}
          onSingleSelection={onSingleSelection}
          columnDetail={columnDetail}
        />
      ) : (
        <CheckboxInput
          selectedColumns={selectedColumns}
          columnDetail={columnDetail}
          handleDisableCheckbox={handleDisableCheckbox}
          onMultipleSelection={onMultipleSelection}
        />
      )}
    </>
  );
}
