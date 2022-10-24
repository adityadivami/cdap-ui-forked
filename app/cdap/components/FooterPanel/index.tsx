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
import T from 'i18n-react';
import React from 'react';
import { ArrowIcon, ColumnIcon, ZoomIcon } from './images';
import { useStyles } from './styles';
import { IFooterPanelProps } from './types';

export default function({
  recipeStepsCount,
  dataCounts,
  columnViewPanelOpened,
}: IFooterPanelProps) {
  const classes = useStyles();
  return (
    <Box className={classes.containerProps}>
      <Box className={classes.innnerContainer}>
        <Box
          className={`${classes.imgContainer} ${
            columnViewPanelOpened ? classes.showDepth : classes.showNormalView
          }`}
          data-testid="footer-panel-column-icon-container"
        >
          {ColumnIcon}
        </Box>
        <Box className={classes.dataWrapper}>
          <p className={classes.data} data-testid="footerpanel-labels-title">
            {`Current data - ${dataCounts.rowCount} rows and ${dataCounts.columnCount} columns`}
          </p>
        </Box>
        <Box className={classes.zoomContainer} data-testid="footerpanel-box-zoom">
          {ZoomIcon}
          <p className={classes.zoomPercent} data-testid="footerpanel-labels-zoompercent">
            {T.translate('features.FooterPanel.labels.zoomPercent100')}
          </p>
          {ArrowIcon}
        </Box>
        <Box className={classes.directivesContainer}>
          <p data-testid="footerpanel-labels-directives">
            {T.translate('features.FooterPanel.labels.directives')}
          </p>
        </Box>
        <Box className={classes.recipeContainer}>
          <p data-testid="footerpanel-labels-recipesteps">
            {T.translate('features.FooterPanel.labels.recipeSteps')}
          </p>
          <p className={classes.recipeCount} data-testid="footerpanel-labels-recipecount">
            {recipeStepsCount}
          </p>
        </Box>
      </Box>
    </Box>
  );
}
