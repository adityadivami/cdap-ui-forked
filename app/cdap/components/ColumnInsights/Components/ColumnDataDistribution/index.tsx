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
import BarChart from 'react-bar-chart';
import { useStyles } from 'components/ColumnInsights/Components/ColumnDataDistribution/styles';
import { IColumnDataDistributionProps } from 'components/ColumnInsights/Components/ColumnDataDistribution/types';
import T from 'i18n-react';
import { NavLink } from 'react-router-dom';
import { IRecords } from 'components/GridTable/types';
import RenderLabel from 'components/ColumnInsights/Components/common/RenderLabel/index';
import styled from 'styled-components';
import blue from '@material-ui/core/colors/blue';
import { PREFIX } from 'components/ColumnInsights/constants';

const StyledBarChart = styled(BarChart)`
  background: 'blue';
`;

export default function({ graphData }: IColumnDataDistributionProps) {
  const classes = useStyles();
  const barChartProps = {
    margin: { top: 20, right: 20, bottom: 70, left: 40 },
    width: 400,
    height: 200,
  };

  const handleBarClick = () => {
    // TODO
  };

  const spliceData = (data: IRecords) => {
    if (data && data?.length >= 10) {
      return data.slice(0, 9);
    }
    return data;
  };

  return (
    <div className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>
        <RenderLabel fontSize={16}>
          <>{T.translate(`${PREFIX}.distribution`).toString()}</>
        </RenderLabel>
        <NavLink to="#" data-testid="view-full-chart-link">
          <RenderLabel fontSize={14} color={`${blue[500]}`}>
            <> {T.translate(`${PREFIX}.viewFullChart`).toString()}</>
          </RenderLabel>
        </NavLink>
      </div>

      <div className={classes.columnDataQualityGraph}>
        <StyledBarChart
          ylabel={`${PREFIX}.barChartYLabel`}
          {...barChartProps}
          data={spliceData(graphData)}
          onBarClick={handleBarClick}
        />
      </div>
    </div>
  );
}
