import { Box, makeStyles, Typography } from '@material-ui/core';
import { UnderLine } from 'components/ConnectorTypes/iconStore';
import React from 'react';

const useStyles = makeStyles({
  dataExploration: {
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '0.15px',
    marginBottom: '-4px',
  },
  dataExplorationWrapper: {
    marginTop: '50px',
    marginBottom: '13px',
  },
});

const WrangleHomeTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <Box className={classes.dataExplorationWrapper}>
      <Typography className={classes.dataExploration}>{title}</Typography>
      {UnderLine}
    </Box>
  );
};
export default WrangleHomeTitle;
