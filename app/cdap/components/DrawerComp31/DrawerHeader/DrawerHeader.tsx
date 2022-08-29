import React from 'react';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine, DownloadIcon, Line, Infoo } from '../iconStore';

const DrawerHeader = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
        <div>
          <h1 className={classes.headerTitle}>Recipe</h1>
          {UnderLine}
        </div>
        <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
          <div>{DownloadIcon}</div>
          <div className={classes.marginSide}> {Infoo}</div>
          <div> {Line}</div>

          <div onClick={props.toggleDrawer} className={classes.marginSide}>
            {closeOutLine()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DrawerHeader;
