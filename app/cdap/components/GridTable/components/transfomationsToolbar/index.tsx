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

import { IconButton, Typography, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { default as React, useState } from 'react';
import NestedMenu from '../NestedMenu';
import T from 'i18n-react';

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
import FunctionSearch from '../FunctionSearch';

const ToolBarList = ({ columnType, submitMenuOption, setShowBreadCrumb, showBreadCrumb }) => {
  const classes = useStyles();
  const [isShowNames, setIsShowName] = useState(false);
  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        <Tooltip
          title={T.translate(`features.GridPage.toolbar.undoTitle`)}
          arrow
          classes={{
            tooltip: classes.tooltipToolbar,
            arrow: classes.arrowTooltip,
          }}
        >
          <Box className={classes.functionNameWrapper}>
            <IconButton onClick={() => submitMenuOption('undo', ['all'])}>{Undo}</IconButton>
            {isShowNames && (
              <Typography className={classes.typoClass}>
                {T.translate('features.GridPage.toolbar.undoTitle')}
              </Typography>
            )}
          </Box>
        </Tooltip>
        <Tooltip
          title={T.translate('features.GridPage.toolbar.redoTitle')}
          arrow
          classes={{
            tooltip: classes.tooltipToolbar,
            arrow: classes.arrowTooltip,
          }}
        >
          <Box className={classes.functionNameWrapper}>
            <IconButton onClick={() => submitMenuOption('redo', ['all'])}>{Redo}</IconButton>
            {isShowNames && (
              <Typography className={classes.typoClass}>
                {T.translate('features.GridPage.toolbar.redoTitle')}
              </Typography>
            )}
          </Box>
        </Tooltip>
        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={NULL_MISSING_OPTIONS}
            columnType={columnType}
            icon={NullIcon}
            submitMenuOption={submitMenuOption}
            title={T.translate('features.GridPage.toolbar.nullTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.nullTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={INVALID_ICON_OPTIONS}
            columnType={columnType}
            icon={InvalidIcon}
            submitMenuOption={submitMenuOption}
            title={T.translate('features.GridPage.toolbar.invalidTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.invalidTitle')}
            </Typography>
          )}
        </Box>

        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={COLUMN_OPTIONS}
            columnType={columnType}
            icon={ColumnIcon}
            submitMenuOption={submitMenuOption}
            title={T.translate('features.GridPage.toolbar.columnTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.columnTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={StructureIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={MENU_OPTIONS}
            title={T.translate('features.GridPage.toolbar.structureTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.structureTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={FragmentIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={FRAGMENT_OPTIONS}
            title={T.translate('features.GridPage.toolbar.fragmentTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.fragmentTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={MathIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={MATH_OPTIONS}
            title={T.translate('features.GridPage.toolbar.mathTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.mathTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={SecurityIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={SECURITY_OPTIONS}
            title={T.translate('features.GridPage.toolbar.securityTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.securityTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={OtherIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={OTHER_OPTIONS}
            title={T.translate('features.GridPage.toolbar.otherTitle').toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.toolbar.otherTitle')}
            </Typography>
          )}
        </Box>
        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
        <Tooltip
          title={T.translate('features.GridPage.toolbar.gridTitle')}
          arrow
          classes={{
            tooltip: classes.tooltipToolbar,
            arrow: classes.arrowTooltip,
          }}
        >
          <Box className={classes.functionNameWrapper}>
            <IconButton>{GridIcon}</IconButton>
            {isShowNames && (
              <Typography className={classes.typoClass}>
                {T.translate('features.GridPage.toolbar.gridTitle')}
              </Typography>
            )}
          </Box>
        </Tooltip>
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
