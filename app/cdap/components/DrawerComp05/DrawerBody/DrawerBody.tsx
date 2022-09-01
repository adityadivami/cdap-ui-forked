import React from 'react';
import { useDrawerCss } from '../styles';
import { Divider } from '@material-ui/core';
import { DeleteIcon } from '../iconStore';

const DrawerBody = () => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div>
        <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
          <p className={classes.weight40}> Sales_Cali_Sep.csv </p>
          {DeleteIcon}
        </div>
        <Divider />
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
