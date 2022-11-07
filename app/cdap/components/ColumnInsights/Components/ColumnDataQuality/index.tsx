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
import { useStyles } from 'components/ColumnInsights/Components/ColumnDataQuality/styles';
import ToggleButton from 'components/ColumnInsights/Components/ColumnToggleButton';
import { Box, Typography } from '@material-ui/core';
import { IColumnDataQualityProps } from 'components/ColumnInsights/Components/ColumnDataQuality/types';
import red from '@material-ui/core/colors/red';
import T from 'i18n-react';

const PREFIX = 'features.NewWranglerUI.ColumnInsights';

export default function({ dataQuality, columnInfo }: IColumnDataQualityProps) {
  const classes = useStyles();
  const nonNull = columnInfo?.general['non-null'] || 0,
    empty = columnInfo?.general?.empty || 0;
  const filled = nonNull - empty;

  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <Typography component="span" className={classes.columnInsightsColumnName}>
        {T.translate(`${PREFIX}.quality`).toString()}
      </Typography>
      <Box className={classes.qualityBar}>
        <Typography component="span" className={classes.filled} style={{ width: `${filled}%` }} />
        <Typography
          component="span"
          className={classes.empty}
          style={{
            width: `${100 - filled}%`,
            border: `${100 - filled === 0 ? 'none' : `1px solid ${red[600]}`}`,
          }}
        />
      </Box>
      <section>
        <ToggleButton dataQuality={dataQuality} />
      </section>
    </section>
  );
}
