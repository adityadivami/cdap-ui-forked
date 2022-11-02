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
import { IStatistics } from 'components/GridTable/types';
export interface IRecords {
  [key: string]: string | number | IRecords | boolean;
}
export interface IHeaderNamesList {
  name: string;
  label: string;
  type: string[];
}

export interface IAddTransformationProps {
  directiveFunctionSupportedDataType: string[];
  functionName: string;
  columnData: IHeaderNamesList[];
  missingDataList: IStatistics;
  callBack: () => void;
}

export interface IMultipleSelectedFunctionDetail {
  value: string;
  isMoreThanTwo: boolean;
}

export interface IDataQualityItem {
  [key: string]: string | number;
}
