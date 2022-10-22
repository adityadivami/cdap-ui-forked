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

import { IRecords } from 'components/GridTable/types';
import { ReactNode } from 'react';

export interface IConnectionTabs {
  tabsData: ITabsData;
  handleChange: (entity: IRecords, index: number) => void;
  value: string | ReactNode;
  index: number;
  connectionId: string | ReactNode | unknown;
  setIsErrorOnNoWorkSpace: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoader: (value: boolean, isError?: boolean) => void;
}

interface ITabsData {
  data: Array<Record<string, string | number | boolean | IRecords | JSX.Element>>;
  isSearching: boolean;
  selectedTab: string;
  showTabs: boolean;
}
