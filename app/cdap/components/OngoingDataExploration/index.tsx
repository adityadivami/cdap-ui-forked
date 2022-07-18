import React from 'react';
import OngoingExplorationCard from './OngoingDataExplorationCard';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';

import { UnderLine, RightArrow } from './iconStore';

const useStyles = makeStyles({
  rightContainerStyles: {
    minWidth: '746px',

    padding: '60px 40px 75px 60px',
  },
  dataExplorationHeader: {
    fontSize: '18px',
    lineHeight: '150%',
    fontWeight: 400,
  },
  underLine: {
    lineHeight: '2px',
  },
  dataExplorationCardContainer: {
    marginTop: '21px',
    display: 'flex',
    gap: '20px',
    cursor: 'pointer',
  },
  viewAllOngoingWorkspaceLink: {
    fontSize: '14px',
    lineHeight: '21px',
    color: '#4681F4',
    marginTop: '20px',
    display: 'flex',
    gap: '8px',
    alignItems: 'centre',
  },
  rightArrowIconStyle: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const OngoingDataExploration = () => {
  const mockData = [
    {
      datasetName: 'IndiaSales_DataTable2',
      recipeSteps: '14',
      dataQuality: 65,
      connectionName: 'Connection_Sales_Big',
      progressValue: 50,
    },
    {
      datasetName: 'USACustomers_DataTable1',
      recipeSteps: '03',
      dataQuality: 32,
      connectionName: 'Connection_Sales_Big',
      progressValue: 20,
    },
  ];
  const classes = useStyles();
  return (
    <>
      <Box className={classes.rightContainerStyles}>
        <Typography className={classes.dataExplorationHeader}>
          Continue ongoing data explorations, pick up where you left off
        </Typography>
        <Box className={classes.underLine}>{UnderLine}</Box>
        <Box className={classes.dataExplorationCardContainer}>
          {mockData.map((item, index) => {
            return <OngoingExplorationCard ongoingExplorationData={item} key={index} />;
          })}
        </Box>
        <Box className={classes.viewAllOngoingWorkspaceLink}>
          <Typography>View all ongoing workspaces</Typography>

          <Box className={classes.rightArrowIconStyle}> {RightArrow}</Box>
        </Box>
      </Box>
    </>
  );
};
export default OngoingDataExploration;
