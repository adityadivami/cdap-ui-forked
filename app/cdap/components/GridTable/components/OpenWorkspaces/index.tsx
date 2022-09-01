/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MyDataPrepApi from 'api/dataprep';
import React, { useEffect, useState } from 'react';
import { Divider } from '../OpenWorkspaces/iconStore';
import { useStyles } from './styles';
import { getCurrentNamespace } from 'services/NamespaceStore';

const OpenWorkspaces = () => {
  const classes = useStyles();
  const history = useHistory();
  const [workspaceId, setWorkspaceId] = useState();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [workspaceCount, setWorkspaceCount] = useState<number>();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const getWorkspaceList = () => {
    MyDataPrepApi.getWorkspaceList({
      context: 'default',
    }).subscribe((res) => {
      setWorkspaceCount(res.count);
      console.log(res);
      res.values.forEach((workspace) => {
        setWorkspaceList((prev) => [
          ...prev,
          { workspaceName: workspace.workspaceName, workspaceId: workspace.workspaceId },
        ]);
      });
    });
  };
  const handleClose = (event, currentWorkspaceId) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setWorkspaceId(currentWorkspaceId);
    const path = `/ns/${getCurrentNamespace()}/wrangler-grid/${currentWorkspaceId}`;
    history.push(path);
  };
  const handleCloseOfViewAllWorkspaces = (event) => {
    const path = `/ns/${getCurrentNamespace()}/home`;
    history.push(path);
  };

  const handleCloseOnAway = (e) => {
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

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.menu}>
                <ClickAwayListener onClickAway={handleCloseOnAway}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    className={classes.menuList}
                  >
                    {workspaceList.map((workspace, index) => {
                      if (index <= 3) {
                        return (
                          <MenuItem
                            onClick={(e) => handleClose(e, workspace.workspaceId)}
                            className={classes.menuItem}
                            key={index}
                          >
                            <Typography className={classes.menuItemtext}>
                              {workspace.workspaceName}
                            </Typography>
                          </MenuItem>
                        );
                      }
                    })}

                    <MenuItem
                      onClick={(e) => handleCloseOfViewAllWorkspaces(e)}
                      className={classes.viewAll}
                    >
                      <Typography className={classes.menuItemtext}>
                        View all ongoing workspaces
                      </Typography>
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
