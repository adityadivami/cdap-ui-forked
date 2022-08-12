import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => {
  return {
    panelStyles: {
      border: '1px solid black',
      width: '30%',
      height: '100%',
    },
    headerStyles: {
      border: '1px solid black',
      height: '10%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bodyStyles: {
      border: '1px solid black',
      height: '80%',
    },
    footerStyles: {
      border: '1px solid black',
      height: '10%',
    },
  };
});

const Drawer = (props) => {
  const [drawerStatus, setDrawerStatus] = useState(true);
  const classes = useStyles();
  const { header, body, footer } = props;

  const closeClickHandler = () => {
    setDrawerStatus(false);
  };

  const componentToRender = (
    <Box className={classes.panelStyles}>
      {header && (
        <Box className={classes.headerStyles}>
          <Box>{header}</Box>
          <CloseIcon onClick={closeClickHandler} />
        </Box>
      )}
      {body && <Box className={classes.bodyStyles}>{body}</Box>}
      {footer && <Box className={classes.headerStyles}>{footer}</Box>}
    </Box>
  );

  return drawerStatus && componentToRender;
};

export default Drawer;
