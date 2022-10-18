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

import { IconButton, Typography, Tooltip, TextField } from '@material-ui/core';
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
} from './iconStore';
import { useStyles } from './styles';
import FunctionToggle from '../FunctionNameToggle';
import { COLUMN_OPTIONS } from '../NestedMenu/menuOptions/columnOptions';
import { FRAGMENT_OPTIONS } from '../NestedMenu/menuOptions/fragmentOptions';
import { INVALID_ICON_OPTIONS } from '../NestedMenu/menuOptions/invalidIconOptions';
import { MATH_OPTIONS } from '../NestedMenu/menuOptions/mathOptions';
import { MENU_OPTIONS } from '../NestedMenu/menuOptions/menuOptions';
import { NULL_MISSING_OPTIONS } from '../NestedMenu/menuOptions/nullAndMissingOptions';
import { OTHER_OPTIONS } from '../NestedMenu/menuOptions/otherOptions';
import { SECURITY_OPTIONS } from '../NestedMenu/menuOptions/securityOptions';

export default function TransfomationsToolbar({
  columnType,
  submitMenuOption,
  setShowBreadCrumb,
  showBreadCrumb,
}) {
  const classes = useStyles();
  const [isShowNames, setIsShowName] = useState(false);
  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        <Tooltip
          title={T.translate('features.GridPage.transformationsToolbar.labels.undoIcon')}
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
                {T.translate('features.GridPage.transformationsToolbar.labels.undoIcon')}
              </Typography>
            )}
          </Box>
        </Tooltip>
        <Tooltip
          title={T.translate('features.GridPage.transformationsToolbar.labels.redoIcon')}
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
                {T.translate('features.GridPage.transformationsToolbar.labels.redoIcon')}
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
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.nullIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.nullIcon')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={INVALID_ICON_OPTIONS}
            columnType={columnType}
            icon={InvalidIcon}
            submitMenuOption={submitMenuOption}
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.invalidIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.invalidIcon')}
            </Typography>
          )}
        </Box>

        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            menuOptions={COLUMN_OPTIONS}
            columnType={columnType}
            icon={ColumnIcon}
            submitMenuOption={submitMenuOption}
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.columnIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.columnIcon')}
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
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.structureIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.structureIcon')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={FragmentIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={FRAGMENT_OPTIONS}
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.fragmentIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.fragmentIcon')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={MathIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={MATH_OPTIONS}
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.mathIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.mathIcon')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={SecurityIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={SECURITY_OPTIONS}
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.securityIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.securityIcon')}
            </Typography>
          )}
        </Box>
        <Box className={classes.functionNameWrapper}>
          <NestedMenu
            columnType={columnType}
            icon={OtherIcon}
            submitMenuOption={submitMenuOption}
            menuOptions={OTHER_OPTIONS}
            title={T.translate(
              'features.GridPage.transformationsToolbar.labels.otherIcon'
            ).toString()}
          />
          {isShowNames && (
            <Typography className={classes.typoClass}>
              {T.translate('features.GridPage.transformationsToolbar.labels.otherIcon')}
            </Typography>
          )}
        </Box>
        <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
        <Tooltip
          title={T.translate('features.GridPage.transformationsToolbar.labels.gridIcon')}
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
                {T.translate('features.GridPage.transformationsToolbar.labels.gridIcon')}
              </Typography>
            )}
          </Box>
        </Tooltip>
        <Box className={classes.lastDivider}> {isShowNames ? LongDivider : Divider}</Box>
        <Box className={classes.searchBar}>
          {/* Search functionality UI component will be added here */}
        </Box>
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
}
