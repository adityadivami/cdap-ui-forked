import { DISTRIBUTION } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';

const ColumnDataDistribution = () => {
  const classes = useStyles();

  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>{DISTRIBUTION}</div>
    </section>
  );
};

export default ColumnDataDistribution;
