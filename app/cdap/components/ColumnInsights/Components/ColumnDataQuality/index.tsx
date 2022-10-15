import { QUALITY } from 'components/ColumnInsights/constants';
import React from 'react';
import { useStyles } from './styles';
import ToggleButton from '../ColumnToggleButton';
import { Box, Typography } from '@material-ui/core';

const ColumnDataQuality = ({ dataQuality, columnInfo }) => {
  const classes = useStyles();
  const nonNull = columnInfo?.general['non-null'] || 0,
    empty = columnInfo?.general?.empty || 0;

  const filled = nonNull - empty;
  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <div className={classes.columnInsightsColumnName}>{QUALITY}</div>
      <Box className={classes.qualityBar}>
        <Typography component="span" className={classes.filled} style={{ width: `${filled}%` }} />
        <Typography
          component="span"
          className={classes.empty}
          style={{
            width: `${100 - filled}%`,
            border: `${100 - filled === 0 ? 'none' : '1px solid #E53935'}`,
          }}
        />
      </Box>
      <section>
        <ToggleButton dataQuality={dataQuality} />
      </section>
    </section>
  );
};

export default ColumnDataQuality;
