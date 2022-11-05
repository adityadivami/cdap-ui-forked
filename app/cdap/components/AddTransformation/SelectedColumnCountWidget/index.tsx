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
import { useStyles } from 'components/AddTransformation/styles';
import T from 'i18n-react';
import { ISelectedColumnCountWidgetProps } from 'components/AddTransformation/SelectedColumnCountWidget/types';
import { SELECT_COLUMN_LIST_PREFIX } from 'components/AddTransformation/constants';

export default function({ selectedColumnsCount }: ISelectedColumnCountWidgetProps) {
  const classes = useStyles();

  return (
    <div className={classes.columnsCountTextStyles} data-testid='count-widget-parent'>
      {selectedColumnsCount
        ? selectedColumnsCount > 10
          ? selectedColumnsCount
          : `${T.translate(
              `${SELECT_COLUMN_LIST_PREFIX}.zero`
            )}${selectedColumnsCount}`
        : `${T.translate(`${SELECT_COLUMN_LIST_PREFIX}.no`)}`}
      &nbsp;{T.translate(`${SELECT_COLUMN_LIST_PREFIX}.columnsSelected`)}
    </div>
  );
}
