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
import { useStyles } from 'components/ConnectionList/Components/TabLabelCanBrowse/styles';
import { ITabLabelItemProps } from 'components/ConnectionList/Components/TabLabelCanBrowse/types';
import React, { Fragment } from 'react';

export default function({ labelTestId, label, count, myLabelRef }: ITabLabelItemProps) {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography
        variant="body1"
        className={classes.labelStyles}
        ref={myLabelRef}
        data-testid={labelTestId}
        component="span"
      >
        {label}
      </Typography>
      {count && (
        <Typography
          variant="body1"
          className={classes.labelStylesCount}
          component="span"
        >{`(${count})`}</Typography>
      )}
    </Fragment>
  );
}
