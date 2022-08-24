import React from 'react';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine } from '../iconStore';

const DrawerHeader = (props) => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      {props.isShowHeader ? (
        <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
          <div>
            {props.actionHead ? props.actionHead() : <></>}&nbsp;
            <div>
              <h1 className={classes.headerTitle}>{props.headerTitle}</h1>
              {UnderLine}
            </div>
          </div>
          <div>
            <div>{props.extraActions ? props.extraActions() : <></>}</div>
            <div onClick={props.toggleDrawer}>{closeOutLine()}</div>
          </div>
        </div>
      ) : (
        <div className={classes.flexBetweenBaseLine + ' ' + classes.paddingDiv}>
          <div>
            <h1 className={classes.headerTitle}>{props.headerTitle}</h1>
            {UnderLine}
          </div>
          <div onClick={props.toggleDrawer}>{closeOutLine()}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DrawerHeader;
