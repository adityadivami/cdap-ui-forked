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

import { MenuItem, Typography } from '@material-ui/core';
import React from 'react';
import { useNestedMenuStyles } from '../NestedMenu/styles';
import { menuArrowIcon } from '../TransfomationToolbar/iconStore';
import { IMenuItemComponentProps } from './types';
import T from 'i18n-react';

export default function({ item, index, onMenuClick, columnType }: IMenuItemComponentProps) {
  const classes = useNestedMenuStyles();
  if (item?.value === T.translate('features.WranglerNewUI.GridPage.menuItems.divider')) {
    return <hr className={classes.divider} key={index} />;
  }
  if (item?.value === T.translate('features.WranglerNewUI.GridPage.menuItems.heading')) {
    return (
      <div className={classes.heading} key={index}>
        {item.label}
      </div>
    );
  } else {
    return (
      <MenuItem
        key={index}
        disabled={
          columnType
            ? item?.supported_dataType?.includes(columnType) ||
              item?.supported_dataType?.includes('all')
              ? false
              : true
            : false
        }
        title={item.value}
        onClick={(e) => onMenuClick(e, item)}
      >
        <Typography>{item.label} </Typography>
        {item?.options?.length && menuArrowIcon}
      </MenuItem>
    );
  }
}
