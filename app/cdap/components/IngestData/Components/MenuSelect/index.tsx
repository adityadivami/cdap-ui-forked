/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain `a` copy of
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

import { Box, FormControl, Select, MenuItem, Tooltip } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export const MenuSelect = (props) => {
  const {
    ingestMenuSelectlabel,
    menuItems,
    ingestDataSelectValue,
    handleIngestDataSelectValue,
    menuSelectLabelStyle,
    tooltipLabel,
  } = props;
  const classes = useStyles();
  return (
    <Box>
      <FormControl variant="outlined">
        <label className={menuSelectLabelStyle}>{ingestMenuSelectlabel}</label>
        <Box className={classes.selectInfo}>
          <Select
            id="demo-simple-select"
            value={ingestDataSelectValue}
            onChange={handleIngestDataSelectValue}
            className={classes.select}
          >
            {menuItems.map((item, index) => {
              return (
                <MenuItem value={item.name} key={index}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
          <Box className={classes.infoIconContainer}>
            <Tooltip
              title={tooltipLabel}
              placement="top-start"
              classes={{ tooltip: classes.customTooltip }}
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
