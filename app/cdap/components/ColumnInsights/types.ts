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
export interface IColumnInsightsProps {
  columnData: IColumnData;
  renameColumnNameHandler: (oldColumnName: string, newColumnName: string) => void;
  dataTypeHandler: (dataType: string) => void;
  columnType: string;
  onClose: () => void;
}

export interface IColumnData {
  open: boolean;
  columnName: string;
  distinctValues: number;
  characterCount: ICharacterCount;
  dataQuality: IDataQuality;
  dataQualityBar: {};
  dataTypeString: string;
  dataDistributionGraphData: IRecords[];
}

interface ICharacterCount {
  min: number;
  max: number;
}

interface IDataQuality {
  missingNullValueCount: number;
  missingNullValuePercentage: number;
  invalidValueCount: number;
  invalidValuePercentage: number;
}
