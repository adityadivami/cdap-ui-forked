import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Divider } from '../OpenWorkspaces/iconStore';
import { useStyles } from './styles';

const OpenWorkspaces = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [workspaceList, setWorkspaceList] = useState([
    'Sales_March.csv',
    'USACustomers_DataTable1.csv',
    'USACustomers_DataTable1.csv',
    'USACustomers_DataTable1.csv',
  ]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box className={classes.openWorkspaceWrapper}>
      <Box className={classes.divider}>{Divider}</Box>
      <Box>
        <Typography
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.workspace}
        >
          4 workspaces open
        </Typography>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className={classes.menuWrapper}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.menu}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    className={classes.menuList}
                  >
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      Sales_March.csv
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      USACustomers_DataTable1.csv
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      Customers_December 21.avro
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      Customers_Nov. 21.csv
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.lastMenuItem}>
                      View all ongoing workspaces
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
};
export default OpenWorkspaces;
