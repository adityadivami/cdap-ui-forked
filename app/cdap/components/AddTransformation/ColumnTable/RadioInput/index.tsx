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
import { Radio } from '@material-ui/core';
import { IRadioInputProps } from 'components/AddTransformation/ColumnTable/types';

export default function({ selectedColumns, onSingleSelection, columnDetail }: IRadioInputProps) {
  return (
    <Radio
      color="primary"
      onClick={() => onSingleSelection(columnDetail)}
      checked={
        selectedColumns?.filter((column) => column.label === columnDetail.label).length
          ? true
          : false
      }
      data-testid={`radio-input-radio-${columnDetail.label}`}
    />
  );
}
