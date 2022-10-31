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
import { ITransformationToolBarProps } from './types';
import { Divider, Expand, LongDivider } from './iconStore';
import { useStyles } from './styles';
import FunctionToggle from '../FunctionNameToggle';
import { nestedMenuOptions } from './utils';

export default function({
  columnType,
  submitMenuOption,
  setShowBreadCrumb,
  showBreadCrumb,
}: ITransformationToolBarProps) {
  const classes = useStyles();
  const [isShowNames, setIsShowName] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
  const [nestedMenuList, setNestedMenuList] = useState(nestedMenuOptions);

  const handleMenuOpenClose = (title) => {
    // let newState = [...nestedMenuList];
    // newState = newState.map((each) => {
    //   each.open = false;
    //   return each;
    // });

    setNestedMenuList((previousState) =>
      previousState.map((each) => {
        each.open = false;
        return each;
      })
    );
  };

  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        {nestedMenuList?.map((i, index) => {
          return (
            <>
              <Box className={classes.functionNameWrapper}>
                {i.options?.length ? (
                  <>
                    <Tooltip
                      title={i.title}
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
                          let newState = [...nestedMenuList];
                          newState = newState.map((each) => {
                            each.open = false;
                            return each;
                          });
                          newState[index].open = !newState[index].open;
                          setNestedMenuList(newState);
                          setAnchorEl(e.currentTarget);
                        }}
                      >
                        {' '}
                        {i.icon}
                      </IconButton>
                    </Tooltip>
                    <NestedMenu
                      menuOptions={i.options}
                      columnType={columnType}
                      icon={i.icon}
                      submitMenuOption={submitMenuOption}
                      title={i.title}
                      setAnchorEl={setAnchorEl}
                      anchorEl={anchorEl}
                      open={nestedMenuList[index].open}
                      handleMenuOpenClose={handleMenuOpenClose}
                    />
                    {isShowNames && (
                      <Typography className={classes.typoClass}>{i.toolName}</Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Tooltip
                      title={i.title}
                      classes={{
                        tooltip: classes.tooltipToolbar,
                        arrow: classes.arrowTooltip,
                      }}
                      arrow
                    >
                      <IconButton onClick={() => submitMenuOption(i.action, i.dataType)}>
                        {i.icon}
                      </IconButton>
                    </Tooltip>
                    {isShowNames && (
                      <Typography className={classes.typoClass}>{i.toolName}</Typography>
                    )}
                  </>
                )}
              </Box>
              {(index === 4 || index === 1 || index === 9) && (
                <Box className={classes.divider}> {isShowNames ? LongDivider : Divider}</Box>
              )}
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
