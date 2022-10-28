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
interface IClasses {
  [key: string]: string;
}
interface IObject {
  [key: string]: string;
}
interface IInput {
  classes: IClasses;
  type: 'text' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: 'primary' | 'secondary';
  placeholder: string;
}
export interface IFormInputFieldComponentProps {
  formInputValue: string;
  classnames: string;
  inputProps: IInput;
}

export interface IInputCheckboxProps {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export interface IRadioInputWithCustomComponentProps {
  options: IObject[];
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  customInputType: string;
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface INewColumnProps {
  column: string;
  setColumnName: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
}
