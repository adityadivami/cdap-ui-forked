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

import { DISTRIBUTION } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';
import BarChart from 'react-bar-chart';

const margin = { top: 20, right: 20, bottom: 70, left: 40 };

const spliceData = (data) => {
  if (data.length >= 10) {
    return data.slice(0, 9);
  }
  return data;
};

const ColumnDataDistribution = ({ graphData }) => {
  const classes = useStyles();
  const handleBarClick = () => {};
  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>{DISTRIBUTION}</div>
      <div className={classes.columnDataQualityGraph}>
        <BarChart
          style={{ background: 'blue' }}
          ylabel="Quantity"
          width={410}
          height={200}
          margin={margin}
          data={spliceData(graphData)}
          onBarClick={handleBarClick}
        />
      </div>
    </section>
  );
};

export default ColumnDataDistribution;
