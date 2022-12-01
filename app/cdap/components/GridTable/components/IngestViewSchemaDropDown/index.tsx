/*
 * Copyright © 2021 Cask Data, Inc.
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

import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';

const options = ['Ingest Data', 'View Schema'];

const KebabMenu = styled(Menu)`
  & div {
    width: 246px;
  }
`;

const KebabIcon = styled(MoreVertIcon)`
  font-size: 30px;
`;

export default function() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        data-testid="ingest-view-drop-button"
      >
        <KebabIcon />
      </Button>
      <KebabMenu
        id="long-menu"
        keepMounted
        anchorEl={anchorEl}
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 2,
          horizontal: 210,
        }}
        onClick={(e: any) => {
          e.preventDefault();
          setAnchorEl(null);
        }}
      >
        {options.map((item, index) => (
          <MenuItem key={index} onClick={handleClose} data-testid="ingest-view-menu-item">
            {item}
          </MenuItem>
        ))}
      </KebabMenu>
    </div>
  );
}
