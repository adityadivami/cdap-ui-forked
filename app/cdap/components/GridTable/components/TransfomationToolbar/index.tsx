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
import { default as React, useEffect, useState } from 'react';
import NestedMenu from '../NestedMenu';
import T from 'i18n-react';

import { Divider, Expand, LongDivider } from './iconStore';
import { useStyles } from './styles';
import FunctionToggle from '../FunctionNameToggle';
import { nestedMenuOptions } from './utils';

export default function({ columnType, submitMenuOption, setShowBreadCrumb, showBreadCrumb }) {
  const classes = useStyles();
  const [isShowNames, setIsShowName] = useState(false);

  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        {nestedMenuOptions?.map((i, index) => {
          return i.options?.length ? (
            <>
              <Box className={classes.functionNameWrapper}>
                <NestedMenu
                  menuOptions={i.options}
                  columnType={columnType}
                  icon={i.icon}
                  submitMenuOption={submitMenuOption}
                  title={i.title}
                />
                {isShowNames && <Typography className={classes.typoClass}>{i.toolName}</Typography>}
              </Box>
              {(index === 4 || index === 1) && (
                <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
              )}
            </>
          ) : (
            <>
              <Tooltip
                title={i.title}
                arrow
                classes={{
                  tooltip: classes.tooltipToolbar,
                  arrow: classes.arrowTooltip,
                }}
              >
                <Box className={classes.functionNameWrapper}>
                  <IconButton onClick={() => submitMenuOption(i.action, i.dataType)}>
                    {i.icon}
                  </IconButton>
                  {isShowNames && (
                    <Typography className={classes.typoClass}>{i.toolName}</Typography>
                  )}
                </Box>
              </Tooltip>
            </>
          );
        })}
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
