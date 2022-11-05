import { Box } from '@material-ui/core';
import { useStyles } from 'components/FooterPanel/Components/common/TabWrapper/styles';
import React from 'react';
import { ITabWrapperProps } from './types';

export default function({ type, clickEventListener, children }: ITabWrapperProps) {
  const classes = useStyles();

  return (
    <>
      {type === 'small' && (
        <Box
          className={`${classes.small}`}
          data-testid="footer-panel-small-tab"
          onClick={clickEventListener}
        >
          {children}
        </Box>
      )}
      {type === 'medium' && (
        <Box
          className={`${classes.medium}`}
          data-testid="footer-panel-medium-tab"
          onClick={clickEventListener}
        >
          {children}
        </Box>
      )}
      {type === 'large' && (
        <Box
          className={`${classes.large}`}
          data-testid="footer-panel-large-tab"
          onClick={clickEventListener}
        >
          {children}
        </Box>
      )}
    </>
  );
}
