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

import { IconButton, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FunctionSearch from 'components/FunctionSearch';
import { default as React, useState } from 'react';
import NestedMenu from '../NestedMenu';
import {
  ColumnIcon,
  Divider,
  Expand,
  FragmentIcon,
  GridIcon,
  InvalidIcon,
  LongDivider,
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
import FunctionToggle from '../FunctionNameToggle';

const ToolBarList = ({ columnType, submitMenuOption, setShowBreadCrumb, showBreadCrumb }) => {
  const classes = useStyles();
  const [isShowNames, setIsShowName] = useState(false);
  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        <Box className={classes.functionNameWrapper}>
          <IconButton onClick={() => submitMenuOption('undo', ['all'])}>{Undo}</IconButton>
          {isShowNames && <Typography className={classes.typoClass}>Undo</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <IconButton onClick={() => submitMenuOption('redo', ['all'])}>{Redo}</IconButton>
          {isShowNames && <Typography className={classes.typoClass}>Redo</Typography>}
        </Box>

        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>

        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={NULL_MISSING_OPTIONS}
            columnType={columnType}
            icon={NullIcon}
            submitMenuOption={submitMenuOption}
          />
          {isShowNames && <Typography className={classes.typoClass}>Null</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={INVALID_ICON_OPTIONS}
            columnType={columnType}
            icon={InvalidIcon}
            submitMenuOption={submitMenuOption}
          />
          {isShowNames && <Typography className={classes.typoClass}>Invalid</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={COLUMN_OPTIONS}
            columnType={columnType}
            icon={ColumnIcon}
            submitMenuOption={submitMenuOption}
          />
          {isShowNames && <Typography className={classes.typoClass}>Column</Typography>}
        </Box>
        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>

        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={StructureIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={MENU_OPTIONS}
          />
          {isShowNames && <Typography className={classes.typoClass}>Structure</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={FragmentIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={FRAGMENT_OPTIONS}
          />
          {isShowNames && <Typography className={classes.typoClass}>Fragment</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={MathIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={MATH_OPTIONS}
          />
          {isShowNames && <Typography className={classes.typoClass}>Math</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={SecurityIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={SECURITY_OPTIONS}
          />
          {isShowNames && <Typography className={classes.typoClass}>Security</Typography>}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={OtherIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={OTHER_OPTIONS}
          />
          {isShowNames && <Typography className={classes.typoClass}>Other</Typography>}
        </Box>

        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
        <Box className={classes.functionNameWrapper}>
          <IconButton>{GridIcon}</IconButton>
          {isShowNames && <Typography className={classes.typoClass}>Grid</Typography>}
        </Box>

        <Box className={classes.lastDivider}> {isShowNames ? LongDivider : Divider}</Box>

        <FunctionSearch
          transformationPanel={(value) => {
            submitMenuOption(value, ['all']);
          }}
        />
      </Box>
      <FunctionToggle setIsShowName={setIsShowName} isShowNames={isShowNames} />
      <IconButton
        className={showBreadCrumb ? classes.openHeader : classes.closeHeader}
        onClick={() => setShowBreadCrumb(!showBreadCrumb)}
      >
        {Expand}
      </IconButton>
    </Box>
  );
};
export default ToolBarList;
