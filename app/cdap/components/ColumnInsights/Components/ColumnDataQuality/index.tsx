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
import { useStyles } from 'components/ColumnInsights/Components/ColumnDataQuality/styles';
import { IColumnDataQualityProps } from 'components/ColumnInsights/Components/ColumnDataQuality/types';
import ToggleButton from 'components/ColumnInsights/Components/ColumnToggleButton';
import RenderLabel from 'components/ColumnInsights/Components/common/RenderLabel';
import { PREFIX } from 'components/ColumnInsights/constants';
import T from 'i18n-react';
import React from 'react';

export default function({ dataQuality, columnInfo }: IColumnDataQualityProps) {
  const classes = useStyles();
  const nonNull = columnInfo?.general['non-null'] || 0;
  const empty = columnInfo?.general?.empty || 0;
  const filled = nonNull - empty;
  const calculatedEmptyValue = 100 - filled;

  return (
    <section className={classes.columnInsightsDataQualityTopSection}>
      <RenderLabel fontSize={16}>
        <>{T.translate(`${PREFIX}.quality`).toString()}</>
      </RenderLabel>
      <Box className={classes.qualityBar}>
        <Typography component="span" className={classes.filled} style={{ width: `${filled}%` }} />
        <Typography
          component="span"
          className={classes.empty}
          style={{
            width: `${calculatedEmptyValue}%`,
          }}
        />
      </Box>
      <section>
        <ToggleButton dataQuality={dataQuality} columnInfo={columnInfo} />
      </section>
    </section>
  );
}
