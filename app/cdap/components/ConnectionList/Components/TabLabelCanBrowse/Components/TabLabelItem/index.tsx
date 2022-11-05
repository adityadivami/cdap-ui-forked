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

import { Box } from '@material-ui/core';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import TabLabelItemLabel from 'components/ConnectionList/Components/TabLabelCanBrowse/Components/TabLabelItemLabel';
import { useStyles } from 'components/ConnectionList/Components/TabLabelCanBrowse/styles';
import { ITabLabelProps } from 'components/ConnectionList/Components/TabLabelCanBrowse/types';
import React from 'react';

export default function({
  icon,
  label,
  count,
  labelContainerTestId,
  labelTestId,
  myLabelRef,
}: ITabLabelProps) {
  const classes = useStyles();

  return (
    <Box className={classes.labelContainerBox} data-testid={labelContainerTestId}>
      <Box className={classes.labelsContainer}>
        {icon && <Box className={classes.connectorTypeIcon}>{icon}</Box>}
        <TabLabelItemLabel
          myLabelRef={myLabelRef}
          labelTestId={labelTestId}
          label={label}
          count={count}
        />
      </Box>
      <Box>
        <Box className={'canBrowseNormal'}>
          <ChevronRightRounded className={classes.rightArrow} />
        </Box>
        <Box className={'canBrowseHover'}>
          <ChevronRightRounded className={classes.rightArrowSelected} />
        </Box>
      </Box>
    </Box>
  );
}
