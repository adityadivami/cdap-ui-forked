import * as React from 'react';
import OngoingExplorationCard from './OngoingDataExplorationCard';
import { Box, Grid, Typography } from '@material-ui/core';
import { UnderLine, RightArrow } from './iconStore';
import { mockData } from './mock/index';
import { useStyles } from './styles';
import { IMockData } from './mock/types';

const OngoingDataExploration: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.rightContainerStyles}>
      <Typography component="div" variant="body2" className={classes.dataExplorationHeader}>
        Continue ongoing data explorations, pick up where you left off
      </Typography>
      <Box className={classes.underLine}>{UnderLine}</Box>
      <Grid container className={classes.gridCard}>
        {mockData.map((item: IMockData[], index: number) => {
          return (
            <Grid item>
              <OngoingExplorationCard itemData={item} key={index} />
            </Grid>
          );
        })}
      </Grid>
      <Box className={classes.viewAllOngoingWorkspaceLink}>
        <Typography component="div">View all ongoing workspaces</Typography>

        <Box className={classes.rightArrowIconStyle}> {RightArrow}</Box>
      </Box>
    </Box>
  );
};
export default OngoingDataExploration;
