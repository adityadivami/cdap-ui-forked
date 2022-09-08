import { QUALITY } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';

const ColumnDataQuality = () => {
  const classes = useStyles();

  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>{QUALITY}</div>
      <section></section>
    </section>
  );
};

export default ColumnDataQuality;
