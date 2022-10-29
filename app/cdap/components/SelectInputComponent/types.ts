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
export interface ISelectOptions {
  label: string;
  value: string;
  isInputRequired?: boolean;
  isCheckboxRequired?: boolean;
  directive?: (condition: string, column: string, ignoreCase: boolean, textValue: string) => string;
}
export interface ISelectColumnProps {
  optionSelected: string;
  setOptionSelected: React.Dispatch<React.SetStateAction<string>>;
  options: ISelectOptions[] | string[];
  customInput?: string;
  setCustomInput?: React.Dispatch<React.SetStateAction<string>>;
  customInputPlaceHolder?: string;
  checkboxValue: boolean;
  setCheckboxValue: React.Dispatch<React.SetStateAction<boolean>>;
  checkboxLabel: string;
  functionName?: string;
}
