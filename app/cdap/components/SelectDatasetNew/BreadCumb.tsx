import React from 'react';
import Box from '@material-ui/core/Box';
import { PrevPageIcon } from './SVGs/wrangleIcon';
import { DownloadIcon } from './SVGs/wrangleIcon';
import { makeStyles, styled, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  breadCombContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '48px',
    alignItems: 'center',
    marginRight: '30px',
    marginLeft: '34px',
  },
  breadCombBox1: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  breadCombBox2: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
});

const BreadCumb = () => {
  const classes = useStyles();
  return (
    <Box className={classes.breadCombContainer}>
      <Box className={classes.breadCombBox1}>
        <PrevPageIcon />
        <Typography>Select Dataset</Typography>
      </Box>
      <Box className={classes.breadCombBox2}>
        <DownloadIcon />
        <Typography>Import Data</Typography>
      </Box>
    </Box>
  );
};

export default BreadCumb;
