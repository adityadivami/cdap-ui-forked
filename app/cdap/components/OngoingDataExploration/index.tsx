import React from 'react';
import OngoingExplorationCard from './OngoingDataExplorationCard';
import { Box, Typography } from '@material-ui/core';
import { UnderLine, RightArrow } from './iconStore';
import { mockData } from './mock';
import { useStyles } from './styles';

const OngoingDataExploration = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.rightContainerStyles}>
        <Typography component="div" variant="body2" className={classes.dataExplorationHeader}>
          Continue ongoing data explorations, pick up where you left off
        </Typography>
        <Box className={classes.underLine}>{UnderLine}</Box>
        <Box className={classes.dataExplorationCardContainer}>
          {mockData.map((item, index) => {
            return <OngoingExplorationCard itemData={item} key={index} />;
          })}
        </Box>
        <Box className={classes.viewAllOngoingWorkspaceLink}>
          <Typography component="div" variant="body2">
            View all ongoing workspaces
          </Typography>

          <Box className={classes.rightArrowIconStyle}> {RightArrow}</Box>
        </Box>
      </Box>
    </>
  );
};
export default OngoingDataExploration;
