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

import React from 'react';
import { styled } from '@material-ui/core';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import { Typography, Box } from '@material-ui/core';
import { useStyles } from './styles';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    color: '#757575',
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#757575',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
        border: theme.palette.mode === 'dark' ? '1px solid #757575' : '1px solid #757575',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
    border: theme.palette.mode === 'dark' ? '1px solid #757575' : '1px solid #757575',
    boxSizing: 'border-box',
  },
}));

export default function({ setIsShowName, isShowNames }) {
  const classes = useStyles();
  return (
    <Box className={classes.functionWrapper}>
      <Typography className={classes.typoClass}>Function names &nbsp;</Typography>
      <AntSwitch
        onClick={() => setIsShowName(!isShowNames)}
        checked={isShowNames}
        inputProps={{ 'aria-label': 'ant design' }}
      />
    </Box>
  );
}
