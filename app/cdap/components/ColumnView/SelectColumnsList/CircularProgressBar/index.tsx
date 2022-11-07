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

import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './styles';

const MatchMeter: React.FC<{ value: number }> = ({ value }) => {
  const classes = useStyles();

  const getInlineStyles = (): string => {
    if (value < 100) {
      return '#E97567';
    } else {
      return '#8BCC74';
    }
  };
  return (
    <>
      <Typography component="div" className={classes.progress}>
        <Typography component="div" className={classes.barOverflow}>
          <Typography
            style={{
              borderBottomColor: getInlineStyles(),
              borderRightColor: getInlineStyles(),
              transform: `rotate(${45 + value * 1.8}deg)`,
            }}
            component="div"
            className={classes.bar}
          ></Typography>
        </Typography>
        <Typography component="span" className={classes.value} style={{ color: getInlineStyles() }}>
          {value.toFixed(1)}%
        </Typography>
      </Typography>
    </>
  );
};

export default MatchMeter;
