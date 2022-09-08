import { QUALITY } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';
import ToggleButton from '../ColumnToggleButton';

const ColumnDataQuality = ({ dataQuality }) => {
  const classes = useStyles();

  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>{QUALITY}</div>
      <section>
        <ToggleButton dataQuality={dataQuality} />
      </section>
    </section>
  );
};

export default ColumnDataQuality;
