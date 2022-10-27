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

import { ChangeEvent, ReactNode } from 'react';

export interface IInputCheckboxProps {
  label: ReactNode | string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export interface IInputSelectProps {
  options: IOptions[] | ReactNode;
  value: string | ReactNode;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  classes: { icon: string; select: string };
  className: string;
  fullWidth: boolean;
  optionClassName: { root: string };
  defaultValue: string | ReactNode;
}
interface IOptions {
  label: string | ReactNode;
  value: string | ReactNode | boolean;
}
export interface IParsingPopupBodyProps {
  values: IParsingPopupBodyPropsValues;
  changeEventListener: (value: string | boolean, property: string) => void;
}

interface IParsingPopupBodyPropsValues {
  format: string;
  fileEncoding: string;
  enableQuotedValues: boolean;
  skipHeader: boolean;
}

export interface IParsingDrawer {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateDataTranformation: (wid: string) => void;
}

export interface IDefaultErrorOnTransformations {
  open: boolean;
  message: string | ReactNode;
}

export interface IConnectionPayload {
  connection: string;
  path: string;
  sampleRequest: ISampleRequest;
}
interface ISampleRequest {
  limit: number;
  properties: IProperties;
}
interface IProperties {
  enableQuotedValues: boolean;
  fileEncoding: string;
  format: string;
  schema: unknown;
  skipHeader: boolean;
  _pluginName: unknown;
}

export interface IDefaultProperties {
  format: string;
  fileEncoding: string;
  enableQuotedValues: boolean;
  skipHeader: boolean;
}
