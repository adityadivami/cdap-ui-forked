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
      >
        <MoreVertIcon />
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
          vertical: -5,
          horizontal: 200,
        }}
        onClick={(e: any) => {
          e.preventDefault();
          setAnchorEl(null);
        }}
      >
        {options.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </KebabMenu>
    </div>
  );
}
