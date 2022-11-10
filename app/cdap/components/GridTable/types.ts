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

import { ITransformationComponentValues } from 'components/AddTransformation/types';

export interface IParams {
  context: string;
  workspaceId: string;
  namespace?: string;
  wid?: string;
  connectorType?: string;
}

export interface IRecords {
  wid?: string;
  payload?: IParams;
  body?: string;
  path?: string;
  canBrowse?: boolean;
  name?: string;
}
export interface IPercentOfDataTypeValues {
  [key: string]: number;
}
export interface IGeneralObjectRecord {
  [key: string]: number | string;
}
export interface IGeneral {
  general?: IGeneralObjectRecord;
  types?: IGeneralObjectRecord;
}
export interface IStatistics {
  [key: string]: IGeneral;
}
interface ISummary {
  statistics: IStatistics;
  validations: IRecords;
}

export interface IExecuteAPIResponse {
  headers: string[];
  types: IGridCellData;
  values: IRecords[];
  summary: ISummary;
  message: string;
}

export interface IHeaderNamesList {
  name: string;
  label: string;
  type: string[];
}

export interface IDataQuality {
  [key: string]: string;
}

export interface IRowData {
  [key: string]: string;
}

export interface IMissingListData {
  name: string;
  values: Record<string, string>;
}

export interface IRequestBody {
  directives: string[];
  insights?: IRecords;
  limit: number;
}

export interface IGridParams {
  directives: string[];
  insights: IRecords;
  workspaceId: string;
  workspaceInfo: IRecords;
  workspaceUri: string;
}

export interface IApiPayload {
  payload: IRecords;
  requestBody: IRequestBody;
  gridParams: IGridParams;
}

export interface IGridCellData {
  [key: string]: string;
}

export interface IMissingList {
  name: string;
  values: Record<string, string>;
}

export interface IAddTransformationItem {
  option: string;
  supportedDataType: string[];
}

export interface ITransformationContentParams {
  setTransformationComponentsValue: React.Dispatch<
    React.SetStateAction<ITransformationComponentValues>
  >;
  transformationComponent: ITransformationComponentType[];
  transformationComponentValues: ITransformationComponentValues;
  transformationName: string;
  transformationDataType: string[];
  columnsList: IHeaderNamesList[];
  missingItemsList: IStatistics;
  onCancel: () => void;
  applyTransformation: (directive: string) => void;
}

export interface ITransformationComponentType {
  type: string;
  component: (props) => JSX.Element;
}
