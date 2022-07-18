import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { styled, Tooltip, Typography } from '@material-ui/core';

const StyledLinearProgress = styled(LinearProgress)({
  borderRadius: '2px',
  maxWidth: '199px',
  backgroundColor: '#DADCE0',
  maxHeight: '4px',

  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#4BAF4F',
  },
});

const LinearProgressComponent = ({ progressValue }) => {
  return <StyledLinearProgress variant="determinate" value={progressValue} />;
};

export default LinearProgressComponent;
