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
import MyDataPrepApi from 'api/dataprep';
import React, { useEffect, useState } from 'react';
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
  const [workspaceCount, setWorkspaceCount] = useState<number>();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const getWorkspaceList = () => {
    MyDataPrepApi.getWorkspaceList({
      context: 'default',
    }).subscribe((res) => {
      console.log('res', res);
      setWorkspaceCount(res.count);
    });
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
  useEffect(() => {
    getWorkspaceList();
  }, []);
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
          {workspaceCount} workspaces open
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
                    {workspaceList.map((workspaceName, index) => {
                      return (
                        <MenuItem onClick={handleClose} className={classes.menuItem} key={index}>
                          <Typography className={classes.menuItemtext}>{workspaceName}</Typography>
                        </MenuItem>
                      );
                    })}
                    {/* <MenuItem onClick={handleClose} className={classes.menuItem}>
                      <Typography className={classes.menuItemtext}>Sales_March.csv</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      <Typography className={classes.menuItemtext}>
                        USACustomers_DataTable1.csvhuwdhiwjdowj
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      <Typography className={classes.menuItemtext}>
                        Customers_December 21.avro
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      <Typography className={classes.menuItemtext}>
                        Customers_Nov. 21.csv
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.lastMenuItem}>
                      <Typography className={classes.menuItemtext}>
                        View all ongoing workspaces
                      </Typography>
                    </MenuItem> */}
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
