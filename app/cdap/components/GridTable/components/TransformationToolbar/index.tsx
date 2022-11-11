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

import { IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { default as React, useState } from 'react';
import NestedMenu from 'components/GridTable/components/NestedMenu';
import { ITransformationToolBarProps } from 'components/GridTable/components/TransformationToolbar/types';
import {
  Divider,
  LongDivider,
} from 'components/GridTable/components/TransformationToolbar/iconStore';
import { useStyles } from 'components/GridTable/components/TransformationToolbar/styles';
import FunctionToggle from 'components/GridTable/components/FunctionNameToggle';
import { nestedMenuOptions } from 'components/GridTable/components/TransformationToolbar/utils';
import { IMenuItem } from 'components/GridTable/components/MenuItemComponent/types';
import ExpandButton from 'components/common/ExpandButton';
import { SimpleLabel } from 'components/common/TypographyText';
import ReplayIcon from '@material-ui/icons/Replay';

export default function({
  columnType,
  submitMenuOption,
  setShowBreadCrumb,
  showBreadCrumb,
}: ITransformationToolBarProps) {
  const classes = useStyles();
  const [showName, setShowName] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement[]>(null);
  const [selectedMenuOptions, setSelectedMenuOptions] = useState<IMenuItem[]>([]);

  const toggleMenu = () => {
    setSelectedMenuOptions([]);
    setAnchorElement(null);
  };

  return (
    <Box className={classes.iconContainer} data-testid="transformations-toolbar-container">
      <Box className={classes.container} data-testid="nested-menu-container">
        {nestedMenuOptions?.map((eachOption, optionIndex) => {
          console.log('eachOption', eachOption);
          return (
            <>
              <Box
                className={classes.functionNameWrapper}
                data-testid={`toolbar-icon-${eachOption.title
                  .toLowerCase()
                  .split(' ')
                  .join('-')}`}
              >
                <Tooltip
                  title={eachOption.title}
                  classes={{
                    tooltip: classes.tooltipToolbar,
                    arrow: classes.arrowTooltip,
                  }}
                  arrow
                  data-testid={`toolbar-icon-tooltip-${eachOption.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                >
                  <IconButton
                    onClick={(clickEvent) => {
                      if (eachOption.options?.length) {
                        clickEvent.preventDefault();
                        clickEvent.stopPropagation();
                        setSelectedMenuOptions(eachOption.options);
                        setAnchorElement([clickEvent.currentTarget]);
                      } else {
                        submitMenuOption(eachOption.action, eachOption.dataType);
                      }
                    }}
                    data-testid="toolbar-icon-button"
                  >
                    {eachOption?.action == 'undo' || eachOption?.action == 'redo' ? (
                      <ReplayIcon
                        classes={{
                          root:
                            eachOption?.action == 'undo'
                              ? classes.muiRootUndoIcon
                              : classes.muiRootRedoIcon,
                        }}
                      />
                    ) : (
                      eachOption.icon
                    )}
                  </IconButton>
                </Tooltip>
                {eachOption.options?.length > 0 && (
                  <NestedMenu
                    menuOptions={selectedMenuOptions}
                    columnType={columnType}
                    submitMenuOption={submitMenuOption}
                    title={eachOption.title}
                    setAnchorElement={setAnchorElement}
                    anchorElement={anchorElement}
                    handleMenuOpenClose={toggleMenu}
                  />
                )}
                {showName && (
                  <SimpleLabel
                    component="div"
                    dataTestId={`toolbar-icon-title-${eachOption.title
                      .toLowerCase()
                      .split(' ')
                      .join('-')}`}
                    text={eachOption.toolName}
                  />
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
          {/* TODO Search functionality UI component will be added here */}
        </Box>
      </Box>
      <FunctionToggle setShowName={setShowName} showName={showName} />
      <ExpandButton
        open={showBreadCrumb}
        onClick={() => setShowBreadCrumb(!showBreadCrumb)}
        dataTestId="toolbar-header-toggler"
      />
    </Box>
  );
}
