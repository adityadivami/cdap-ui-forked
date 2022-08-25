import React from 'react';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine } from '../iconStore';

const DrawerHeader = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      {props.isShowHeader && props.headerComponent ? (
        props.headerComponent()
      ) : (
        <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
          <div>
            <h1 className={classes.headerTitle}>Add Transformation Step</h1>
            {UnderLine}
          </div>
          <div onClick={props.toggleDrawer}>{closeOutLine()}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DrawerHeader;
