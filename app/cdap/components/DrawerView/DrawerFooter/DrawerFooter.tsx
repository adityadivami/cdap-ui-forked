import React from 'react';
import { Button } from '@material-ui/core';
import { useDrawerCss } from '../styles';

const DFooter = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      {props.isShowFooter && props.footerComponent ? (
        props.footerComponent()
      ) : (
        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" disabled className={classes.footerDisableButton}>
            Apply Step
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default DFooter;
