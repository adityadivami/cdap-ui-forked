import React, { useEffect, useState } from 'react';
import OngoingDataExploration from 'components/OngoingDataExploration';
import WrangleCard from 'components/WrangleCard';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { GradientLine } from './icons/GradientLine';
import { HeaderImage } from './icons/HeaderImage';
import WrangleHomeTitle from 'components/WrangleHomeTitle';
import { useStyles } from './styles';
import MyDataPrepApi from 'api/dataprep';

const WranglerHomeNew = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} data-testid="wrangler-home-new-parent">
      <Box className={classes.subHeader}>
        <Typography className={classes.welcome}>
          {' '}
          data Hi David, <br />
          Welcome to Wrangler
        </Typography>
        <Box> {HeaderImage}</Box>
      </Box>
      {GradientLine}

      <Box>
        <WrangleHomeTitle title="Start data exploration" />
        <WrangleCard />
        <WrangleHomeTitle title="Continue ongoing data explorations, pick up where you left off" />
        <OngoingDataExploration />
      </Box>
    </Box>
  );
};
export default WranglerHomeNew;
