import React from 'react';
import { Button } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import { Info } from '../iconStore';

const DFooter = () => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div>
        <p className={classes.weight400 + ' ' + classes.paddingDiv}>
          {Info} &nbsp; Once applied parsing settings cannot be changed
        </p>

        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" className={classes.footerButton}>
            Apply
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DFooter;
