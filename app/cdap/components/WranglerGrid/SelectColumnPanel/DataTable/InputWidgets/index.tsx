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
import { IInputWidgetProps } from 'components/WranglerGrid/SelectColumnPanel/DataTable/types';
import { Checkbox, FormControlLabel, Radio } from '@material-ui/core';
import styled from 'styled-components';

const RadioInput = styled(Radio)`
  &.MuiRadio-root {
    padding: 0;
  }
`;

export default function ({
  isSingleSelection,
  selectedColumns,
  onSingleSelection,
  columnDetail,
  handleDisableCheckbox,
  onMultipleSelection,
  columnIndex,
}: IInputWidgetProps) {

  const getDisableAttributeValue = () => {
    if (selectedColumns?.findIndex((column) => column.label === columnDetail.label) > -1 || !handleDisableCheckbox()) return false
    return true
  }

  const getCheckedAttributeValue = () => {
    if (selectedColumns?.length && selectedColumns?.findIndex((column) => column.label === columnDetail.label) > -1) return true
    return false
  }

  const disabled = getDisableAttributeValue();

  const checked = getCheckedAttributeValue();

  const renderCheckBoxInput = () => <FormControlLabel
    disabled={disabled}
    control={
      <Checkbox
        color="primary"
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onMultipleSelection(event, columnDetail)
        }
        data-testid={`check-box-input-${columnIndex}`}
      />
    }
    label={''}
    data-testid={`form-control-label-parent-${columnIndex}`}
  />

  const renderRadioInput = () => <RadioInput
    color="primary"
    onClick={() => onSingleSelection(columnDetail)}
    checked={checked}
    data-testid={`radio-input-${columnIndex}`}
  />

  return (
    <>
      {isSingleSelection ? renderRadioInput() : renderCheckBoxInput()}
    </>
  );
}
