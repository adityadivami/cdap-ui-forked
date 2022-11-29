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
import MyDataPrepApi from 'api/dataprep';
import React, { useEffect, useRef, useState } from 'react';
import { Divider } from './iconStore';
import { useStyles } from './styles';
import T from 'i18n-react';
import styled from 'styled-components';

const PREFIX = 'features.WranglerNewUI.OpenWorkspacesList';

const CustomizedTypography = styled(Typography)`
  font-style: normal;

  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.15px;
`;
const ViewAllTypography = styled(CustomizedTypography)`
  color: #2196f3;
  font-weight: 400;
`;

const WorkspaceListTypography = styled(CustomizedTypography)`
  color: #616161;
  font-weight: 400;
`;

const WorkspaceOpenTypography = styled(CustomizedTypography)`
  font-weight: 500;
  color: #2196f3;
`;

export default function() {
  const classes = useStyles();
  const [workspaceId, setWorkspaceId] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [workspaceCount, setWorkspaceCount] = useState<number>();
  const maxWorkspaceListCount = 4;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const getWorkspaceList = () => {
    MyDataPrepApi.getWorkspaceList({
      context: 'default',
    }).subscribe((res) => {
      console.log('res', res);
      setWorkspaceCount(res.count);
      res.values.forEach((workspace) => {
        setWorkspaceList((prev) => [
          ...prev,
          {
            workspaceName: workspace.workspaceName,
            workspaceId: workspace.workspaceId,
          },
        ]);
      });
    });
  };

  const handleClose = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    currentWorkspaceId: string
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setWorkspaceId(currentWorkspaceId);
    setOpen(false);
  };

  const handleCloseOnAway = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
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
        <WorkspaceOpenTypography
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.workspace}
        >
          {workspaceCount} workspaces open
        </WorkspaceOpenTypography>

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
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
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
                      if (index < maxWorkspaceListCount) {
                        return (
                          <MenuItem
                            onClick={(e) => handleClose(e, workspace.workspaceId)}
                            className={classes.menuItem}
                            key={index}
                          >
                            <WorkspaceListTypography>
                              {workspace.workspaceName}
                            </WorkspaceListTypography>
                          </MenuItem>
                        );
                      }
                    })}

                    <MenuItem
                      onClick={(e) => handleClose(e, 'openAllWorkspace')}
                      className={classes.viewAll}
                    >
                      <ViewAllTypography>
                        {T.translate(`${PREFIX}.viewAllOngoingWorkspaces`)}
                      </ViewAllTypography>
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
}
