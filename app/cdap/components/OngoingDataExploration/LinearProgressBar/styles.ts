import LinearProgress from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core';

export const StyledLinearProgress = styled(LinearProgress)({
  borderRadius: '2px',
  maxWidth: '199px',
  backgroundColor: '#DADCE0',
  maxHeight: '4px',

  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#4BAF4F',
  },
});
