import { DISTRIBUTION } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';
import BarChart from 'react-bar-chart';

const data = [
  { text: 'Man', value: 500 },
  { text: 'Woman', value: 300 },
  { text: 'x', value: 500 },
  { text: 'y', value: 300 },
  { text: 'a', value: 500 },
  { text: 'b', value: 300 },
  { text: 'xa', value: 500 },
  { text: 'yb', value: 300 },
  { text: 'ac', value: 500 },
  { text: 'be', value: 300 },
];

const margin = { top: 20, right: 20, bottom: 70, left: 40 };

const ColumnDataDistribution = () => {
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
          data={data}
          onBarClick={handleBarClick}
        />
      </div>
    </section>
  );
};

export default ColumnDataDistribution;
