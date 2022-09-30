import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useCss } from './styles';
import { ColumnIcon, ZoomIn, ArrowIcon } from './images';

const Footer = ({
  showRecipePanelHandler,
  showAddTransformationHandler,
  recipeStepsCount,
  setOpenDirective,
  setOpenColumnViewHandler,
  dataCounts,
}) => {
  const classes = useCss();

  return (
    <Box className={classes.containerProps}>
      <Box className={classes.cont}>
        <Box className={classes.imgCont} onClick={() => setOpenColumnViewHandler()}>
          {ColumnIcon}
        </Box>
        <Box className={classes.dataWrapper}>
          <p className={classes.data}>
            {' '}
            {`Current data - ${dataCounts.rowCount} rows and ${dataCounts.columnCount} columns`}
          </p>
        </Box>
        <Box className={classes.zoomCont}>
          {ZoomIn}
          <p className={classes.spanElement}> 100%</p>
          {ArrowIcon}
        </Box>
        <Box className={classes.directivesCont} onClick={() => setOpenDirective(true)}>
          <p> Directives </p>
        </Box>
        <Box className={classes.recipeCont} onClick={showRecipePanelHandler}>
          <p> Recipe Steps</p>
          <p className={classes.spanElement1}>{recipeStepsCount}</p>
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
