import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useDrawerCss } from '../styles';
import { closeOutLine, UnderLine } from '../iconStore';

export default function DHeader({ headerTitle, ...props }) {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      {props.isHeaderVisible && props.headerComponent ? (
        <div className={classes.flexBetween + ' ' + classes.paddingDiv}>
          {props.headerComponent}
          <div onClick={props.toggleDrawer}>{closeOutLine()}</div>
        </div>
      ) : (
        <div className={classes.flexBetween + ' ' + classes.paddingDiv}>
          <div>
            <h1 className={classes.headerTitle}>{headerTitle}</h1>
            {UnderLine}
          </div>
          <div onClick={props.toggleDrawer}>{closeOutLine()}</div>
        </div>
      )}
    </React.Fragment>
  );
}
