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

import DrawerWidget from 'components/DrawerWidget';
import React, { useEffect, useState } from 'react';
import ColumnDataDistribution from './Components/ColumnDataDistribution';
import ColumnDataQuality from './Components/ColumnDataQuality';
import ColumnDetails from './Components/ColumnDetails';
import { COLUMN_INSIGHTS } from 'components/ColumnInsights/constants';
import { IColumnInsightsProps } from 'components/ColumnInsights/types';

export default function ColumnInsights({
  columnData,
  renameColumnNameHandler,
  dataTypeHandler,
  columnType,
  onClose,
}: IColumnInsightsProps) {
  const [drawerStatus, setDrawerStatus] = useState(true);
  const [columnDetail, setColumnDetail] = useState(columnData);

  useEffect(() => {
    setColumnDetail(columnData);
  }, [columnData]);

  const closeClickHandler = () => {
    setDrawerStatus(false);
    onClose();
  };
  return (
    <DrawerWidget
      headingText={COLUMN_INSIGHTS}
      openDrawer={drawerStatus}
      anchor="left"
      headerActionTemplate={undefined}
      closeClickHandler={closeClickHandler}
      showBackIcon={false}
      showDivider={false}
    >
      <ColumnDetails
        columnName={columnDetail?.columnName}
        dataTypeHandler={dataTypeHandler}
        columnType={columnType}
        renameColumnNameHandler={renameColumnNameHandler}
        distinctValues={columnDetail?.distinctValues}
        characterCount={`${columnDetail?.characterCount?.min}-${columnDetail?.characterCount?.max}`}
        dataTypeString={columnDetail?.dataTypeString || 'Contains Letter'}
      />
      <ColumnDataQuality
        dataQuality={columnDetail?.dataQuality}
        columnInfo={columnDetail?.dataQualityBar}
      />
      <ColumnDataDistribution graphData={columnDetail?.dataDistributionGraphData} />
    </DrawerWidget>
  );
}
