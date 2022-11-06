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

import { Box, Typography } from '@material-ui/core';
import useStyles from 'components/ConnectionList/Components/TabLabelCanSample/styles';
import { ITabLabelSampleItemProps } from 'components/ConnectionList/Components/TabLabelCanSample/types';
import React from 'react';

export default function({
  label,
  myLabelRef,
  onExplore,
  entity,
  buttonTestId,
  buttonElement,
}: ITabLabelSampleItemProps) {
  const classes = useStyles();

  return (
    <Box className={classes.labelsContainerCanSample} data-testid="connections-tab-label-simple">
      <Typography variant="body2" className={classes.labelStylesCanSample} ref={myLabelRef}>
        {label}
      </Typography>
      <button
        className="wranglingHover"
        onClick={() => onExplore(entity)}
        data-testid={buttonTestId}
      >
        {buttonElement}
      </button>
    </Box>
  );
}
