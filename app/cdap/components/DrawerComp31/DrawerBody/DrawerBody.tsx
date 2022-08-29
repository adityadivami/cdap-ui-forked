import React from 'react';
import { useDrawerCss } from '../styles';
import { BodyIcon } from '../iconStore';

const DrawerBody = () => {
  const classes = useDrawerCss();
  return (
    <React.Fragment>
      <div className={classes.flexBetween}>
        {BodyIcon}
        <p className={classes.headerTitle}> Start Wrangling your data</p>
        <p className={classes.weight400}>
          {' '}
          Select a Column or function to add your first recipe step
        </p>
      </div>
    </React.Fragment>
  );
};
export default DrawerBody;
