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

import { MenuItem } from '@material-ui/core';
import React from 'react';
import { menuArrowIcon } from 'components/GridTable/components/TransformationToolbar/iconStore';
import { IMenuItemComponentProps } from 'components/GridTable/components/MenuItemComponent/types';
import T from 'i18n-react';
import { NormalFont, MenuHeadText } from 'components/common/TypographyText';
import {ShortDivider} from 'components/common/Divider';

export default function({ item, index, onMenuClick, columnType }: IMenuItemComponentProps) {
  if (item?.value === T.translate('features.WranglerNewUI.GridPage.menuItems.divider')) {
    return <ShortDivider key={index} data-testid="menu-item-divider" />;
  }
  if (item?.value === T.translate('features.WranglerNewUI.GridPage.menuItems.heading')) {
    return (
      <MenuHeadText key={index} data-testid="menu-item-heading">
        {item.label}
      </MenuHeadText>
    );
  } else {
    return (
      <MenuItem
        key={index}
        disabled={
          columnType
            ? item?.supportedDataType?.includes(columnType) ||
              item?.supportedDataType?.includes('all')
              ? false
              : true
            : false
        }
        title={item.label}
        onClick={(onClickEvent) => onMenuClick(onClickEvent, item)}
        data-testid="menu-item-parent"
      >
        <NormalFont component="div">
          {item.label}
        </NormalFont>
        {item?.options?.length > 0 && menuArrowIcon}
      </MenuItem>
    );
  }
}
