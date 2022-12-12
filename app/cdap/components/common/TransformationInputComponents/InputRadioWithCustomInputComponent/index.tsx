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

import { FormControl, Radio, RadioGroup } from '@material-ui/core';
import {
  FormControlLabelComponent,
  FormControlLabelRadioComponent,
  FormGroupComponent,
} from 'components/common/FormComponents';
import { InputComponent } from 'components/common/InputFieldComponent';
import { ISubMenuOption } from 'components/WranglerGrid/TransformationComponents/ParseComponents/types';
import React from 'react';

interface IObject {
  [key: string]: string;
}

interface IRadioInputWithCustomComponentProps {
  options: ISubMenuOption[];
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  customInputType: string;
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function({
  options,
  radioValue,
  setRadioValue,
  customInputType,
  customInput,
  setCustomInput,
}: IRadioInputWithCustomComponentProps) {
  return (
    <FormGroupComponent>
      <FormControl>
        <RadioGroup
          name="actions"
          value={radioValue}
          onChange={(e) => setRadioValue(e.target.value)}
          data-testid="radio-group-actions"
        >
          {options.map((eachRadio, eachRadioIndex) => (
            <FormControlLabelRadioComponent
              value={eachRadio.value}
              data-testid={`form-control-label-radio-${eachRadioIndex}`}
              control={
                <Radio
                  color="primary"
                  data-testid={`form-control-label-radio-option-${eachRadioIndex}`}
                  inputProps={{
                    'data-testid': `radio-option-${eachRadioIndex}`,
                  }}
                  value={eachRadio.value}
                />
              }
              label={eachRadio.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {radioValue === customInputType && (
        <FormControlLabelComponent
          value={customInput}
          control={
            <InputComponent
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              color="primary"
              data-testid="custom-input"
              inputProps={{
                'data-testid': 'custom-value-input',
              }}
            />
          }
          label={''}
        />
      )}
    </FormGroupComponent>
  );
}
