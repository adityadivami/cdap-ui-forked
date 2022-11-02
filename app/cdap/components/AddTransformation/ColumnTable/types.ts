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
import { IHeaderNamesList, IDataQualityItem } from 'components/AddTransformation/types';

export interface IColumnTableProps {
  columns: IHeaderNamesList[];
  transformationFunctionSupportedDataType: string[];
  onSingleSelection: (value: IHeaderNamesList) => void;
  selectedColumns: IHeaderNamesList[];
  dataQualityValue: IDataQualityItem[];
  isSingleSelection: boolean;
  handleDisableCheckbox: () => boolean;
  onMultipleSelection: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: IHeaderNamesList
  ) => void;
}

export interface ITableRowProps {
  onSingleSelection: (value: IHeaderNamesList) => void;
  selectedColumns: IHeaderNamesList[];
  dataQualityValue: IDataQualityItem[];
  isSingleSelection: boolean;
  handleDisableCheckbox: () => boolean;
  onMultipleSelection: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: IHeaderNamesList
  ) => void;
  index: number;
  eachColumn: IHeaderNamesList;
}

export interface IRadioInputProps {
  selectedColumns: IHeaderNamesList[];
  onSingleSelection: (value: IHeaderNamesList) => void;
  eachColumn: IHeaderNamesList;
}

export interface IInputWidgetProps {
  isSingleSelection: boolean;
  selectedColumns: IHeaderNamesList[];
  onSingleSelection: (value: IHeaderNamesList) => void;
  eachColumn: IHeaderNamesList;
  handleDisableCheckbox: () => boolean;
  onMultipleSelection: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: IHeaderNamesList
  ) => void;
}

export interface ICheckBoxInputProps {
  selectedColumns: IHeaderNamesList[];
  handleDisableCheckbox: () => boolean;
  eachColumn: IHeaderNamesList;
  onMultipleSelection: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: IHeaderNamesList
  ) => void;
  label?: string;
}
