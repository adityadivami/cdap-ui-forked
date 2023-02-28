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

import React from 'react';
import MenuItemComponent, { IMenuItem } from 'components/WranglerGrid/NestedMenu/MenuItemComponent';
import { StyledMenuComponent } from 'components/WranglerV2/MenuContainer';
import { Dispatch, SetStateAction } from 'react';

interface IMenuComponentProps {
  anchorElement: Element;
  menuOptions: IMenuItem[];
  setAnchorElement: Dispatch<SetStateAction<Element[]>>;
  onMenuItemClick: (e: React.MouseEvent<Element, MouseEvent>, item: IMenuItem) => void;
  columnType: string;
  setMenuComponentOptions: Dispatch<SetStateAction<IMenuItem[][]>>;
  allColumnsType: string | boolean;
}

export default function({
  anchorElement,
  menuOptions,
  setAnchorElement,
  onMenuItemClick,
  columnType,
  setMenuComponentOptions,
  allColumnsType,
}: IMenuComponentProps) {
  return (
    <StyledMenuComponent
      id="long-menu"
      keepMounted
      anchorEl={anchorElement}
      open={!!anchorElement}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={(e: Event) => {
        e.preventDefault();
        setAnchorElement(null);
        setMenuComponentOptions([]);
      }}
      data-testid="menu-component-parent"
    >
      {menuOptions?.map((eachOption, optionsIndex) => (
        <MenuItemComponent
          columnType={columnType}
          item={eachOption}
          index={optionsIndex}
          onMenuItemClick={onMenuItemClick}
          allColumnsType={allColumnsType}
        />
      ))}
    </StyledMenuComponent>
  );
}
