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

export interface IRecords {
  [key: string]: string | number | IRecords | boolean;
}
export interface IHeaderNamesList {
  name: string;
  label: string;
  type: string[];
}
export interface IDataQuality {
  [key: string]: string;
}
export interface IAddTransformationProp {
  directiveFunctionSupportedDataType: string[];
  functionName: string;
  columnData: IHeaderNamesList[];
  missingDataList: IDataQuality;
  callBack: () => void;
  applyTransformation: (directive: string) => void;
}

export interface ITransformationValues {
  radioOption: string;
  copyColumnName: string;
  customInput: string;
  copyToNewColumn: boolean;
  sheetValue: string;
  firstRowAsHeader: boolean;
  depth: number;
  columnWidths: string;
  optionPaddingParam: string;
}

export interface IMenuOption {
  value: string;
  label: string;
  supported_dataType: string[]; // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
  directive: (string, ITransformationValues) => string;
}
