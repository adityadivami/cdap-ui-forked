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

import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { IDataQualityProps } from 'components/ColumnInsights/Components/ColumnToggleButton/types';
import T from 'i18n-react';

export default function ToggleButton({ dataQuality }: IDataQualityProps) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState<number>(0);
  return (
    <Box>
      <Box className={classes.dataQualityCard}>
        <Box
          className={
            isSelected == 1
              ? `${classes.isSelected} ${classes.missingCountBox}`
              : classes.missingCountBox
          }
          onClick={() => setIsSelected(1)}
        >
          <Typography className={classes.missingText} variant="body1">
            {T.translate('features.NewWranglerUI.ColumnInsights.missingNull')}
            {` ${dataQuality.missingNullValueCount} (${dataQuality.missingNullValuePercentage}%)`}
          </Typography>
        </Box>
        <Box
          className={
            isSelected == 2
              ? `${classes.isSelected} ${classes.invalidCountBox}`
              : classes.invalidCountBox
          }
          onClick={() => setIsSelected(2)}
        >
          <Typography className={classes.invalidText} variant="body1">
            {T.translate('features.NewWranglerUI.ColumnInsights.invalid')}
            {` ${dataQuality?.invalidValueCount} (${dataQuality?.invalidValuePercentage}%)`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
