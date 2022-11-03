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

import { IConnectorType } from 'components/Connections/Browser/SidePanel';
import { ISnackbar } from 'components/Snackbar/types';

export interface IRecords {
  [key: string]: string | number | IRecords | boolean;
}

export interface ITabsData {
  data: IRecords[];
  showTabs: boolean;
  selectedTab: string;
  isSearching: boolean;
}

export interface IConnectionTabsProps {
  tabsData: ITabsData;
  handleChange: (entity: IRecords, index: number) => void;
  value: string;
  connectionColumnIndex: number;
  connectionId: string;
  setToaster: React.Dispatch<React.SetStateAction<ISnackbar>>;
  toggleLoader: (value: boolean, isError?: boolean) => void;
}
