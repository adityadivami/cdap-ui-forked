/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FunctionSearch from 'components/FunctionSearch';
import { default as React } from 'react';
import NestedMenu from '../NestedMenu';
import {
  ColumnIcon,
  Divider,
  Expand,
  FragmentIcon,
  GridIcon,
  InvalidIcon,
  MathIcon,
  NullIcon,
  OtherIcon,
  Redo,
  SearchIconn,
  SecurityIcon,
  StructureIcon,
  Undo,
} from './images';
import { useStyles } from './styles';
import {
  MENU_OPTIONS,
  NULL_MISSING_OPTIONS,
  INVALID_ICON_OPTIONS,
  COLUMN_OPTIONS,
  FRAGMENT_OPTIONS,
  MATH_OPTIONS,
  SECURITY_OPTIONS,
  OTHER_OPTIONS,
} from '../NestedMenu/constants';

const ToolBarList = ({ columnType, submitMenuOption }) => {
  const classes = useStyles();
  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        <IconButton>{Undo}</IconButton>
        <IconButton>{Redo}</IconButton>

        {Divider}
        <NestedMenu
          menuOptions={NULL_MISSING_OPTIONS}
          columnType={columnType}
          icon={NullIcon}
          submitMenuOption={submitMenuOption}
        />
        <NestedMenu
          menuOptions={INVALID_ICON_OPTIONS}
          columnType={columnType}
          icon={InvalidIcon}
          submitMenuOption={submitMenuOption}
        />
        <NestedMenu
          menuOptions={COLUMN_OPTIONS}
          columnType={columnType}
          icon={ColumnIcon}
          submitMenuOption={submitMenuOption}
        />

        {Divider}
        <NestedMenu
          columnType={columnType}
          icon={StructureIcon}
          submitMenuOption={submitMenuOption}
          menuOptions={MENU_OPTIONS}
        />
        <NestedMenu
          columnType={columnType}
          icon={FragmentIcon}
          submitMenuOption={submitMenuOption}
          menuOptions={FRAGMENT_OPTIONS}
        />
        <NestedMenu
          columnType={columnType}
          icon={MathIcon}
          submitMenuOption={submitMenuOption}
          menuOptions={MATH_OPTIONS}
        />
        <NestedMenu
          columnType={columnType}
          icon={SecurityIcon}
          submitMenuOption={submitMenuOption}
          menuOptions={SECURITY_OPTIONS}
        />
        <NestedMenu
          columnType={columnType}
          icon={OtherIcon}
          submitMenuOption={submitMenuOption}
          menuOptions={OTHER_OPTIONS}
        />

        {Divider}
        <IconButton>{GridIcon}</IconButton>

        {Divider}
        <FunctionSearch
          transformationPanel={(value) => {
            submitMenuOption(value, 'all');
          }}
        />
      </Box>
      <IconButton>{Expand}</IconButton>
    </Box>
  );
};
export default ToolBarList;
