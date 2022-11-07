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

import { Menu } from '@material-ui/core';
import React, { useState } from 'react';
import MenuComponent from 'components/GridTable/components/MenuComponent';
import MenuItemComponent from 'components/GridTable/components/MenuItemComponent';
import { IMenuItem } from 'components/GridTable/components/MenuItemComponent/types';
import { useNestedMenuStyles } from 'components/GridTable/components/NestedMenu/styles';
import { INestedMenuProps } from 'components/GridTable/components/NestedMenu/types';
import _ from 'lodash';

export default function({
  menuOptions,
  submitMenuOption,
  columnType,
  title,
  anchorElement,
  setAnchorElement,
  handleMenuOpenClose,
}: INestedMenuProps) {
  const [menuComponentOptions, setMenuComponentOptions] = useState<IMenuItem[][]>([]);
  const classes = useNestedMenuStyles();

  const handleMenuClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuItem: IMenuItem,
    origin?: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (origin === 'parentMenu') {
      if (menuItem.hasOwnProperty('options') && menuItem?.options?.length > 0) {
        setAnchorElement((prev) => [...prev, event.currentTarget]);
        setMenuComponentOptions((prev) => [menuItem?.options]);
      } else {
        submitMenuOption(menuItem.value, menuItem.supported_dataType);
        setAnchorElement(null);
        handleMenuOpenClose(title);
      }
    } else {
      if (menuItem.hasOwnProperty('options') && menuItem?.options?.length > 0) {
        let referenceIndex = -1;
        menuComponentOptions.forEach((menuOptions, menuOptionsIndex) => {
          menuOptions.forEach((eachOption, optionsIndex) => {
            if (eachOption.value === menuItem.value) {
              referenceIndex = menuOptionsIndex;
            }
          });
        });
        if (referenceIndex >= 0 && !anchorElement.includes(event.currentTarget)) {
          const cloneAnchorElement = anchorElement;
          const insertPosition = referenceIndex + 2;
          cloneAnchorElement.splice(insertPosition, 0, event.currentTarget);
          const anchorElementUpdate = cloneAnchorElement.slice(0, insertPosition + 1);
          setAnchorElement((prev) => anchorElementUpdate);
          if (menuComponentOptions.length <= anchorElementUpdate.length - 1) {
            menuComponentOptions.splice(anchorElementUpdate.length - 2, 0, menuItem?.options);
            setMenuComponentOptions((prev) =>
              prev.length ? menuComponentOptions : [menuItem?.options]
            );
          } else {
            menuComponentOptions.splice(anchorElementUpdate.length - 2, 0, menuItem?.options);
            setMenuComponentOptions((prev) =>
              prev.length ? menuComponentOptions : [menuItem?.options]
            );
          }
        } else if (anchorElement.includes(event.currentTarget)) {
          const currentTargetIndex = _.findIndex(
            anchorElement,
            (anchor) => anchor == event.currentTarget
          );
          setAnchorElement((prev) => prev.slice(0, currentTargetIndex + 1));
          setMenuComponentOptions((prev) => prev.slice(0, currentTargetIndex));
        } else {
          setAnchorElement((prev) => [...prev, event.currentTarget]);
          setMenuComponentOptions((prev) =>
            prev.length ? [...prev, menuItem?.options] : [menuItem?.options]
          );
        }
      } else {
        submitMenuOption(menuItem.value, menuItem.supported_dataType);
        setAnchorElement(null);
        handleMenuOpenClose(title);
      }
    }
  };
  return (
    <>
      <Menu
        id="parent-menu"
        keepMounted
        anchorEl={anchorElement?.length ? anchorElement[0] : null}
        open={anchorElement?.length ? true : false}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => handleMenuOpenClose()}
        onClick={(clickEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
        }}
        className={classes.root}
        classes={{ paper: classes.popoverPaper }}
      >
        {menuOptions?.map((eachOption, optionsIndex) => {
          return (
            <MenuItemComponent
              item={eachOption}
              columnType={columnType.toLowerCase()}
              index={optionsIndex}
              onMenuClick={(onClickEvent, clickedItem) =>
                handleMenuClick(onClickEvent, clickedItem, 'parentMenu')
              }
            />
          );
        })}
        {menuComponentOptions?.length > 0 &&
          menuComponentOptions.map((eachOption, optionsIndex) => {
            return (
              <MenuComponent
                anchorElement={anchorElement?.length > 1 ? anchorElement[optionsIndex + 1] : null}
                columnType={columnType.toLowerCase()}
                menuOptions={eachOption}
                setAnchorElement={setAnchorElement}
                setMenuComponentOptions={setMenuComponentOptions}
                submitOption={(onClickEvent, clickedItem) => {
                  onClickEvent.preventDefault();
                  onClickEvent.stopPropagation();
                  handleMenuClick(onClickEvent, clickedItem);
                }}
              />
            );
          })}
      </Menu>
    </>
  );
}
