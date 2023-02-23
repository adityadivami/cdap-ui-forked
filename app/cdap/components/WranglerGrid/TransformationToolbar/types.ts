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
import { IMenuItem } from 'components/WranglerGrid/NestedMenu/MenuItemComponent';

export interface ITransformationToolBarProps {
  columnType: string;
  submitMenuOption: (value: IMenuItem | string, dataType: string[]) => void;
  setShowBreadCrumb: Dispatch<SetStateAction<boolean>>;
  showBreadCrumb: boolean;
  disableToolbarIcon: boolean;
  hasSimilarType: boolean;
  allColumnsType?: string;
}
