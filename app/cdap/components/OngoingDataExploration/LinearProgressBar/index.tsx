import * as React from 'react';
import { ILinearProgressBarProps } from '../mock/types';
import { StyledLinearProgress } from './styles';

const LinearProgressBar: React.FC<ILinearProgressBarProps> = (props) => {
  return <StyledLinearProgress {...props} />;
};

export default LinearProgressBar;
