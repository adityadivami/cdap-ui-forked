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

import { Dispatch, SetStateAction } from 'react';

export interface IRenderLabelProps {
  columnIndex: number;
  connectorType: IConnectorTabType;
  connectionIdProp: string;
  toggleLoader: (value: boolean, isError?: boolean) => void;
  setIsErrorOnNoWorkSpace: Dispatch<SetStateAction<boolean>>;
}

export interface IConnectorTabType {
  connectionId?: string;
  connectionType?: string;
  createdTimeMillis?: number;
  description?: string;
  isDefault?: boolean;
  name: string;
  plugin?: IConnectorTabPlugin;
  preConfigured?: boolean;
  updatedTimeMillis?: number;
  canBrowse?: boolean;
  canSample?: boolean;
  path?: string;
  type?: string;
  properties?: Record<string, string>;
  count?: number;
  icon?: JSX.Element;
  SVG?: JSX.Element;
}

export interface IConnectorTabPlugin {
  artifact: IConnectorTabPluginArtifact;
  category: string;
  name: string;
  properties: IConnectorTabPluginProperties;
  type: string;
}

export interface IConnectorTabPluginArtifact {
  scope: string;
  name: string;
  version: string;
}

export interface IConnectorTabPluginProperties {
  host: string;
  port: string;
  jdbcPluginName: string;
  database: string;
  connectionArgument: string;
  password: string;
  user: string;
}
