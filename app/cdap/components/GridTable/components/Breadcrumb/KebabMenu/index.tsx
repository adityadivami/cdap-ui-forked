import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { otherIcon } from '../images';
import { KEBAB_GRID_PAGE_OPTION } from '../../NestedMenu/constants';
import MenuItemComponent from '../../MenuItemComponent';
import { useStyles } from '../styles';

const MoreOptions = ({ setOpenViewSchema }) => {
  const classes = useStyles();
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
        {otherIcon}
      </Button>
      <Menu
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
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={(e: any) => {
          e.preventDefault();
          setAnchorEl(null);
        }}
        className={classes.root}
      >
        {KEBAB_GRID_PAGE_OPTION.map((item, index) => (
          <MenuItemComponent
            columnType={'all'}
            item={item}
            index={index}
            onMenuClick={(event, item) => {
              if (item.value == 'view-schema') {
                setOpenViewSchema(true);
              }
            }}
          />
        ))}
      </Menu>
    </div>
  );
};

export default MoreOptions;
