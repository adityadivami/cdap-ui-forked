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
import MenuComponent from 'components/GridTable/components/MenuComponent';
import MenuItemComponent from 'components/GridTable/components/MenuItemComponent';
import { IMenuItem } from 'components/GridTable/components/MenuItemComponent/types';
import { useNestedMenuStyles } from 'components/GridTable/components/NestedMenu/styles';
import { INestedMenuProps } from 'components/GridTable/components/NestedMenu/types';

const NestedMenu = ({
  menuOptions,
  submitMenuOption,
  columnType,
  title,
  anchorEl,
  setAnchorEl,
  open,
  handleMenuOpenClose,
  newIndex,
}: INestedMenuProps) => {
  const [menuComponentOptions, setMenuComponentOptions] = useState([]);
  const classes = useNestedMenuStyles();

  const handleMenuClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuItem: IMenuItem
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (menuItem?.options?.length > 0) {
      setAnchorEl((prev) => [...prev, event.currentTarget]);
      setMenuComponentOptions((prev) =>
        prev.length ? [...prev, menuItem?.options] : [menuItem?.options]
      );
    } else {
      submitMenuOption(menuItem.value, menuItem.supported_dataType);
      setAnchorEl(null);
      handleMenuOpenClose(title);
    }
  };

  return (
    <>
      <Menu
        id="parent-menu"
        keepMounted
        anchorEl={anchorEl?.length ? anchorEl[0] : null}
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => {
          setAnchorEl(null);
          handleMenuOpenClose(title);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={classes.root}
      >
        {menuOptions?.map((eachOption, index) => {
          return (
            <MenuItemComponent
              item={eachOption}
              columnType={columnType.toLowerCase()}
              index={index}
              onMenuClick={handleMenuClick}
            />
          );
        })}
        {menuComponentOptions?.length > 0 &&
          menuComponentOptions.map((options, index) => {
            return (
              <MenuComponent
                anchorEl={anchorEl?.length > 1 ? anchorEl[index] : null}
                columnType={columnType.toLowerCase()}
                menuOptions={options}
                setAnchorEl={setAnchorEl}
                submitOption={(e, item) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleMenuClick(e, item);
                  // handleMenuOpenClose(title);
                  // submitMenuOption(item.value, item.supported_dataType);
                }}
              />
            );
          })}
      </Menu>
    </>
  );
};

export default NestedMenu;
