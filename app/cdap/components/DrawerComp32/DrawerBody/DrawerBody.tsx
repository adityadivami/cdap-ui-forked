import React from 'react';
import { useDrawerCss } from '../styles';
import { Divider } from '@material-ui/core';

const DrawerBody = () => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div>
        <div className={classes.flexRow}>
          <p className={classes.weight600}> S.No. &nbsp; Recipe Steps</p>
        </div>

        <Divider />
        <div className={classes.flexRow}>
          <p className={classes.weight400 + ' ' + classes.margintop}>01 </p>
          <p className={classes.marginleft}>
            <span className={classes.weight600}> Parse column </span> 'Body' with delimiter <br />{' '}
            'comma' and set 'first row as header'
          </p>
        </div>
        <Divider />
        <div className={classes.flexRow}>
          <p className={classes.weight400 + ' ' + classes.margintop}>02</p>
          <p className={classes.marginleft}>
            <span className={classes.weight600}> Delete Column </span> 'body'
          </p>
        </div>
        <Divider />
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
