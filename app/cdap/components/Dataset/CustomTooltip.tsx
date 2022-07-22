import { Tooltip, TooltipProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: 'black',
  },
  tooltip: {
    backgroundColor: 'black',
    fontSize: '16px',
  },
}));

const CustomTooltip = (props: TooltipProps) => {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
};

export default CustomTooltip;
