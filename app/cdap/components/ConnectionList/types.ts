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

export interface IFilteredData {
  data: any[];
  showTabs: boolean;
  selectedTab: any;
  toggleSearch: boolean;
}

export interface IHeaderCustomTooltipLabelProps {
  headersRefs: React.MutableRefObject<any[]>;
  index: number;
  filteredData: IFilteredData;
}

export interface IHeaderContentProps extends IHeaderCustomTooltipLabelProps {
  eachFilteredData: any;
  dataForTabs: IFilteredData[];
  searchHandler: (index: number) => void;
  makeCursorFocused: (index: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  refs: React.MutableRefObject<any[]>;
  handleClearSearch: (e: React.MouseEvent<HTMLInputElement>, index: number) => void;
}

export interface IHeaderCustomTooltipProps extends IHeaderCustomTooltipLabelProps {
  dataForTabs: IFilteredData[];
}

export interface IHeaderSearchProps {
  eachFilteredData: any;
  index: number;
  refs: React.MutableRefObject<any[]>;
  makeCursorFocused: (index: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleClearSearch: (e: React.MouseEvent<HTMLInputElement>, index: number) => void;
}

export interface IHeaderSearchInputFieldProps {
  type: string;
  classnames: string;
  refs: React.MutableRefObject<any[]>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
}
