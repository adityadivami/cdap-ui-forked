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
import { NoDataSVG } from 'components/GridTable/iconStore';
import { useStyles } from './styles';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { INoDataScreenProps } from './types';

export default function({ title, subtitle }: INoDataScreenProps) {
  const classes = useStyles();
  return (
    <Box className={classes.noRecordWrapper}>
      <Box className={classes.innerWrapper}>
        {NoDataSVG}
        <Typography data-testid="box-title" className={classes.mainHeaderMessage}>{title}</Typography>
        <Typography data-testid="box-sub-title" className={classes.subHeaderMessage}>{subtitle}</Typography>
      </Box>
    </Box>
  );
}
