import React from 'react';
import { useDrawerCss } from '../styles';
import { Divider } from '@material-ui/core';

const DrawerBody = () => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div>
        <div className={classes.flexRow}>
          <p className={classes.weight600}> S.No.</p>
          <p className={classes.weight600}>Recipe Steps</p>
        </div>
        <Divider />
        <div className={classes.flexRow}>
          <p className={classes.weight40}>01</p>
          <p>
            <span className={classes.weight600}> Parse column </span> 'Body' with delimiter 'comma'
            and set 'first row as header'
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
