import { DISTRIBUTION, VIEW_FULL_CHART } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';
import BarChart from 'react-bar-chart';
import { Button } from '@material-ui/core';

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
      <div className={classes.distributionHeadBox}>
        <div className={classes.columnInsightsColumnName}>{DISTRIBUTION}</div>
        <Button variant="text" classes={{ text: classes.buttonText }}>
          {VIEW_FULL_CHART}
        </Button>
      </div>
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
