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
import NestedMenu from 'components/GridTable/components/NestedMenu';
import { ITransformationToolBarProps } from 'components/GridTable/components/TransformationToolbar/types';
import {
  Divider,
  Expand,
  LongDivider,
} from 'components/GridTable/components/TransformationToolbar/iconStore';
import { useStyles } from 'components/GridTable/components/TransformationToolbar/styles';
import FunctionToggle from 'components/GridTable/components/FunctionNameToggle';
import { nestedMenuOptions } from 'components/GridTable/components/TransformationToolbar/utils';
import { IMenuItem } from 'components/GridTable/components/MenuItemComponent/types';

export default function({
  columnType,
  submitMenuOption,
  setShowBreadCrumb,
  showBreadCrumb,
}: ITransformationToolBarProps) {
  const classes = useStyles();
  const [showName, setShowName] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
  const [selectedMenuOptions, setSelectedMenuOptions] = useState<IMenuItem[]>([]);

  const toggleMenu = () => {
    setSelectedMenuOptions([]);
  };

  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        {nestedMenuOptions?.map((eachOption, optionIndex) => {
          return (
            <>
              <Box className={classes.functionNameWrapper}>
                {eachOption.options?.length ? (
                  <>
                    <Tooltip
                      title={eachOption.title}
                      classes={{
                        tooltip: classes.tooltipToolbar,
                        arrow: classes.arrowTooltip,
                      }}
                      arrow
                    >
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedMenuOptions(eachOption.options);
                          setAnchorEl(e.currentTarget);
                        }}
                      >
                        {' '}
                        {eachOption.icon}
                      </IconButton>
                    </Tooltip>
                    <NestedMenu
                      menuOptions={selectedMenuOptions}
                      columnType={columnType}
                      submitMenuOption={submitMenuOption}
                      title={eachOption.title}
                      setAnchorEl={setAnchorEl}
                      anchorEl={anchorEl}
                      open={Boolean(selectedMenuOptions.length)}
                      handleMenuOpenClose={toggleMenu}
                    />
                    {showName && (
                      <Typography className={classes.typoClass} component="div">
                        {eachOption.toolName}
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Tooltip
                      title={eachOption.title}
                      classes={{
                        tooltip: classes.tooltipToolbar,
                        arrow: classes.arrowTooltip,
                      }}
                      arrow
                    >
                      <IconButton
                        onClick={() => submitMenuOption(eachOption.action, eachOption.dataType)}
                      >
                        {eachOption.icon}
                      </IconButton>
                    </Tooltip>
                    {showName && (
                      <Typography className={classes.typoClass} component="div">
                        {eachOption.toolName}
                      </Typography>
                    )}
                  </>
                )}
              </Box>
              {(optionIndex === 4 || optionIndex === 1 || optionIndex === 9) && (
                <Box className={classes.divider}> {showName ? LongDivider : Divider}</Box>
              )}
            </>
          );
        })}
        <Box className={classes.lastDivider}> {showName ? LongDivider : Divider}</Box>
        <Box className={classes.searchBar}>
          {/* Search functionality UI component will be added here */}
        </Box>
      </Box>
      <FunctionToggle setShowName={setShowName} showName={showName} />
      <IconButton
        className={showBreadCrumb ? classes.openHeader : classes.closeHeader}
        onClick={() => setShowBreadCrumb(!showBreadCrumb)}
      >
        {Expand}
      </IconButton>
    </Box>
  );
}
