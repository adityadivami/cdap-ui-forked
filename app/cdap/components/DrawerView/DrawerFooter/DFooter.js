import React from 'react';
import { Button } from '@material-ui/core';
import { useDrawerCss } from '../styles';

export default function DFooter(props) {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      {props.isFooterVisible && props.footerComponent ? (
        props.footerComponent
      ) : (
        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" disabled className={classes.footerDisableButton}>
            Apply Step
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
