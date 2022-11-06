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

import { IConnectorTabPluginArtifact, IConnectorTabType } from './Components/ConnectionTabs/types';

export interface IFilteredData {
  data: ITabData[];
  showTabs: boolean;
  selectedTab: string;
  toggleSearch: boolean;
}

export interface IHeaderCustomTooltipLabelProps {
  headersRefs: React.MutableRefObject<HTMLDivElement[]>;
  index: number;
  filteredData: IFilteredData;
}

export interface IHeaderContentProps extends IHeaderCustomTooltipLabelProps {
  eachFilteredData: IFilteredData;
  tabsData: IFilteredData[];
  searchHandler: (index: number) => void;
  makeCursorFocused: (index: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  refs: React.MutableRefObject<HTMLDivElement[]>;
  handleClearSearch: (e: React.MouseEvent<HTMLInputElement>, index: number) => void;
}

export interface IHeaderCustomTooltipProps extends IHeaderCustomTooltipLabelProps {
  tabsData: IFilteredData[];
}

export interface IHeaderSearchProps {
  eachFilteredData: IFilteredData;
  index: number;
  refs: React.MutableRefObject<HTMLDivElement[]>;
  makeCursorFocused: (index: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleClearSearch: (e: React.MouseEvent<HTMLInputElement>, index: number) => void;
}

export interface IHeaderSearchInputFieldProps {
  type: string;
  classnames: string;
  refs: React.MutableRefObject<HTMLDivElement[]>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
}

export interface IConnectionTabsProps {
  tabsData: IFilteredData;
  handleChange: (entity: IConnectorTabType, index: number) => void;
  value: string;
  index: number;
  connectionId: string;
  setIsErrorOnNoWorkSpace: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoader?: (value: boolean, isError?: boolean) => void;
}

export interface ITabData extends IConnectorTabType {
  SVG: JSX.Element;
  artifact: IConnectorTabPluginArtifact;
  category: string;
  count: number;
  displayName: string;
  icon: JSX.Element;
  name: string;
  type: string;
}

export interface ITabsDataResponse {
  entities: ITabData[];
  propertyHeaders: string[];
  sampleProperties: ITabsDataResponseSampleProperties[];
  totalCount: number;
}

export interface ITabsDataResponseSampleProperties {
  properties: {
    name: string;
    description: string;
  };
  type: string;
}
