import React from 'react';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine, Frames, Line } from '../iconStore';

const DrawerHeader = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      {props.isShowHeader && props.headerComponent ? (
        props.headerComponent()
      ) : (
        <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
          <div>
            <h1 className={classes.headerTitle}>Parsing</h1>
            {UnderLine}
          </div>
          <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
            {Frames}
            <p className={classes.weight400 + ' ' + classes.marginSide}> Import Schema</p>
            {Line}
            <div onClick={props.toggleDrawer} className={classes.marginSide}>
              {closeOutLine()}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DrawerHeader;
