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

import { IconButton, Menu, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import MenuComponent from '../MenuComponent';
import MenuItemComponent from '../MenuItemComponent';
import { useNestedMenuStyles } from './styles';
import { INestedMenuProps } from './types';

export default function({
  menuOptions,
  icon,
  submitMenuOption,
  columnType,
  title,
  anchorEl,
  setAnchorEl,
  open,
  handleMenuOpenClose,
}: INestedMenuProps) {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [nestedOptions, setNestedOptions] = useState([]);
  const classes = useNestedMenuStyles();

  const handleMenuClick = (event: any, item: any) => {
    setNestedOptions([]);
    event.preventDefault();
    event.stopPropagation();
    if (item.options) {
      setNestedOptions(item.options);
      setAnchorEl2(event.currentTarget);
    } else {
      submitMenuOption(item.value, item.supported_dataType);
      setAnchorEl(null);
      handleMenuOpenClose(title);
    }
  };
  return (
    <>
      <Menu
        id="parent-menu"
        keepMounted
        anchorEl={anchorEl}
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={(e) => {
          setAnchorEl(null);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={classes.root}
      >
        {Array?.isArray(menuOptions) &&
          menuOptions.map((item, index) => (
            <MenuItemComponent
              item={item}
              columnType={columnType.toLowerCase()}
              index={index}
              onMenuClick={handleMenuClick}
            />
          ))}
        <MenuComponent
          anchorEl={anchorEl2}
          columnType={columnType.toLowerCase()}
          menuOptions={nestedOptions}
          setAnchorEl={setAnchorEl2}
          submitOption={(e, item) => {
            e.preventDefault();
            e.stopPropagation();
            setAnchorEl(null);
            handleMenuOpenClose(title);
            setAnchorEl2(null);
            submitMenuOption(item.value, item.supported_dataType);
          }}
        />
      </Menu>
    </>
  );
}
