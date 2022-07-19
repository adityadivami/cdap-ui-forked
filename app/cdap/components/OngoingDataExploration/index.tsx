import React from 'react';
import OngoingExplorationCard from './OngoingDataExplorationCard';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UnderLine, RightArrow } from './iconStore';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { mockData } from './mock';
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
  '& .MuiPaper-elevation1': {
    boxShadow: 'none',
  },
});

const OngoingDataExploration = () => {
  console.log(mockData);
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
            return <OngoingExplorationCard itemData={item} key={index} />;
          })}
        </Box>
        {/* <Link to={}> */}
        <Box className={classes.viewAllOngoingWorkspaceLink}>
          <Typography>View all ongoing workspaces</Typography>

          <Box className={classes.rightArrowIconStyle}> {RightArrow}</Box>
        </Box>
        {/* </Link> */}
      </Box>
    </>
  );
};
export default OngoingDataExploration;
