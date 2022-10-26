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
import styled from 'styled-components';

const ArcContainer = styled(Typography)`
  position: absolute;
  top: 0;
  left: 0;
  width: 59px;
  height: 59px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid #dbdbdb;
  border-bottom-color: ${(props) => (props.value < 100 ? '#E97567' : '#8BCC74')};
  border-right-color: ${(props) => (props.value < 100 ? '#E97567' : '#8BCC74')};
  transform: ${(props) => `rotate(${45 + parseInt(props.value) * 1.8}deg)` || 'rotate(0deg)'};
`;

export default function({ value }: { value: string }) {
  const classes = useStyles();

  return (
    <>
      <Typography component="div" className={classes.progress}>
        <Typography
          data-testid="data-quality-percent-arc"
          id="data-quality-percent-arc"
          component="div"
          className={classes.barOverflow}
        >
          <ArcContainer value={parseInt(value)}></ArcContainer>
        </Typography>
        <Typography
          data-testid="data-quality-percent"
          id="data-quality-percent"
          component="span"
          className={
            parseInt(value) < 100
              ? `${classes.redText} ${classes.value}`
              : `${classes.greenText} ${classes.value}`
          }
        >
          {Number(value).toFixed(0)}%
        </Typography>
      </Typography>
    </>
  );
}
