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
import Typography from '@material-ui/core/Typography';
import { IRecords } from 'components/GridTable/types';

const PREFIX = 'features.NewWranglerUI.ColumnInsights';

export default function({ graphData }: IColumnDataDistributionProps) {
  const classes = useStyles();
  const margin = { top: 20, right: 20, bottom: 70, left: 40 };
  const handleBarClick = () => {
    // TODO
  };
  const spliceData = (data: IRecords) => {
    if (data.length >= 10) {
      return data.slice(0, 9);
    }
    return data;
  };
  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>
        <Typography variant="body2" component="span" className={classes.distribution}>
          {T.translate(`${PREFIX}.distribution`).toString()}
        </Typography>

        <Typography variant="body2" component="span" className={classes.viewFullChart}>
          <NavLink to="#">{T.translate(`${PREFIX}.viewFullChart`).toString()}</NavLink>
        </Typography>
      </div>

      <div className={classes.columnDataQualityGraph}>
        <BarChart
          className={classes.barChart}
          ylabel={`${PREFIX}.barChartYLabel`}
          width={410}
          height={200}
          margin={margin}
          data={spliceData(graphData)}
          onBarClick={handleBarClick}
        />
      </div>
    </section>
  );
}
