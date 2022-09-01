import React from 'react';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine } from '../iconStore';

const DrawerHeader = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
        <div>
          <h1 className={classes.headerTitle}>Import Dataset</h1>
          {UnderLine}
        </div>
        <div onClick={props.toggleDrawer} className={classes.marginn}>
          {closeOutLine()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DrawerHeader;
