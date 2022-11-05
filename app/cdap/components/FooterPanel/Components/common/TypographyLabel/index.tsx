import { Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

export default function({ children, classname }) {
  const classes = useStyles();

  return (
    <Typography
      className={classes[classname]}
      id="footerpanel-labels-zoompercent"
      data-testid="footerpanel-labels-zoompercent"
      component="span"
    >
      {children}
    </Typography>
  );
}
