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

import { Typography, Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from 'components/AddTransformation/CircularProgressBar/styles';
import styled from 'styled-components';
import { ICircularProgressBarProps } from 'components/AddTransformation/CircularProgressBar/type';
import { red, green } from '@material-ui/core/colors';
import { ErrorLabel, SuccessLabel } from 'components/common/TypographyText';

const ArcContainer = styled(Typography)`
  position: absolute;
  top: 0;
  left: 0;
  width: 59px;
  height: 59px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid #dbdbdb;
  border-bottom-color: ${({ value }) => (value < 100 ? red[600] : green[600])};
  border-right-color: ${({ value }) => (value < 100 ? red[600] : green[600])};
  transform: ${({ value }) => `rotate(${45 + value * 1.8}deg)` || 'rotate(0deg)'};
`;

export default function({ value }: ICircularProgressBarProps) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.progress}>
        <Box className={classes.barOverflow}>
          <ArcContainer value={Math.round(value)} />
        </Box>
        {Math.round(value) < 100 ? (
          <ErrorLabel
            size="14px"
            component="div"
            weight={400}
            dataTestId="circular-bar-value"
            text={`${Math.round(value)}%`}
          />
        ) : (
          <SuccessLabel
            size="14px"
            component="div"
            weight={400}
            dataTestId="circular-bar-value"
            text={`${Math.round(value)}%`}
          />
        )}
      </Box>
    </>
  );
}
