import React from 'react';
import { Divider } from '@material-ui/core';
import { useDrawerCss } from '../styles';
import { Icon65, Icon74, Icon100, Icon89, Icon96, Icon6 } from '../iconStore';

const DrawerBody = () => {
  const classes = useDrawerCss();

  return (
    <React.Fragment>
      <div>
        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <p className={classes.weight40}> Columns (30)</p>
          <p className={classes.weight40}> Data Quality</p>
        </div>
        <Divider />

        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400 + ' ' + classes.marginTopp}> Customer Name</p>
              <p className={classes.weight400}> ABC | String</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon65}</p>
        </div>
        <Divider />

        <div
          className={
            classes.flexBetweenBaseLine + ' ' + classes.containerWrapper + ' ' + classes.boxShadoww
          }
        >
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400}> Region</p>
              <p className={classes.weight400}> ABC | String</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon74}</p>
        </div>
        <Divider />

        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400}> Car Model</p>
              <p className={classes.weight400}> ABC | String</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon100}</p>
        </div>
        <Divider />

        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400}> CC Number</p>
              <p className={classes.weight400}> 123 | Credit Card</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon100}</p>
        </div>
        <Divider />

        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400}> Purchase Date</p>
              <p className={classes.weight400}> ABC | Date and Time</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon100}</p>
        </div>
        <Divider />

        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400}> Payment Mode</p>
              <p className={classes.weight400}> ABC | String</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon89}</p>
        </div>
        <Divider />

        <div className={classes.flexBetweenBaseLine + ' ' + classes.containerWrapper}>
          <div className={classes.flexOnly}>
            <div>
              <p className={classes.weight400}> Order amount</p>
              <p className={classes.weight400}> 123 | String</p>
            </div>
          </div>
          <p className={classes.weight400}> {Icon96}</p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
