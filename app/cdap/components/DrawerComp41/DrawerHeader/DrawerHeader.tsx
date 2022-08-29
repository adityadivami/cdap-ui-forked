import React from 'react';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine, SearchIcon, Line } from '../iconStore';

const DrawerHeader = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
        <div>
          <h3 className={classes.headerTitle}>Column View</h3>
          {UnderLine}
        </div>
        <div className={classes.flexOnly}>
          <div className={classes.paddingDivv}> {SearchIcon}</div>
          <div className={classes.paddingDivv}> {Line} </div>
          <div onClick={props.toggleDrawer}>{closeOutLine()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DrawerHeader;
