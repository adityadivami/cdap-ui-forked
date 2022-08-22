import React from 'react';
import OngoingDataExploration from 'components/WranglerHomeNew/Components/OngoingDataExploration';
import WrangleCard from 'components/WranglerHomeNew/Components/WrangleCard';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { GradientLine } from './iconStore/GradientLine';
import { HeaderImage } from './iconStore/HeaderImage';
import WrangleHomeTitle from 'components/WranglerHomeNew/Components/WrangleHomeTitle';
import { useStyles } from './styles';

const WranglerHomeNew = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.subHeader}>
        <Typography className={classes.welcome}>
          Hi David, <br />
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
