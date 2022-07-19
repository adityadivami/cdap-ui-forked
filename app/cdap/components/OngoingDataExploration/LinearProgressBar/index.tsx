import React from 'react';
import { StyledLinearProgress } from './styles';

const LinearProgressComponent = ({ progressValue }) => {
  return <StyledLinearProgress variant="determinate" value={progressValue} />;
};

export default LinearProgressComponent;
