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
import CustomTooltip from 'components/ConnectionList/Components/CustomTooltip';
import T from 'i18n-react';
import React from 'react';
import { ArrowIcon } from 'components/FooterPanel/IconStore/ArrowIcon';
import { ColumnIcon } from 'components/FooterPanel/IconStore/ColumnIcon';
import { ZoomIcon } from 'components/FooterPanel/IconStore/ZoomIcon';
import { useStyles } from 'components/FooterPanel/styles';
import { IFooterPanelProps } from 'components/FooterPanel/types';

const PREFIX = 'features.FooterPanel.labels';

export default function({
  recipeStepsCount,
  dataCounts,
  columnViewPanelOpened,
  setOpenColumnViewHandler,
}: IFooterPanelProps) {
  const classes = useStyles();

  return (
    <Box className={classes.containerProps}>
      <Box className={classes.innnerContainer}>
        <Box>
          <CustomTooltip title={`${T.translate(`${PREFIX}.columnViewPanel`)}`}>
            <Box
              className={`${classes.imgContainer} ${
                columnViewPanelOpened ? classes.showDepth : classes.showNormalView
              }`}
              data-testid="footer-panel-column-icon-container"
              id="footer-panel-column-icon-container"
              onClick={setOpenColumnViewHandler}
            >
              {ColumnIcon}
            </Box>
          </CustomTooltip>
        </Box>
        <Box className={classes.dataWrapper}>
          <Typography
            className={classes.data}
            id="footerpanel-labels-title"
            data-testid="footerpanel-labels-title"
            component="span"
          >
            {`${T.translate(`${PREFIX}.currentData`)} - ${dataCounts.rowCount} ${T.translate(
              `${PREFIX}.rows`
            )} ${T.translate(`${PREFIX}.and`)} ${dataCounts.columnCount} ${T.translate(
              `${PREFIX}.columns`
            )}`}
          </Typography>
        </Box>
        <Box
          className={classes.zoomContainer}
          data-testid="footerpanel-box-zoom"
          id="footerpanel-box-zoom"
        >
          {ZoomIcon}
          <Typography
            className={classes.zoomPercent}
            id="footerpanel-labels-zoompercent"
            data-testid="footerpanel-labels-zoompercent"
            component="span"
          >
            {`${T.translate(`${PREFIX}.zoomPercent100`)}`}
          </Typography>
          {ArrowIcon}
        </Box>
        <Box className={classes.directivesContainer}>
          <Typography
            data-testid="footerpanel-labels-directives"
            id="footerpanel-labels-directives"
            component="span"
          >
            {`${T.translate(`${PREFIX}.directives`)}`}
          </Typography>
        </Box>
        <Box className={classes.recipeContainer}>
          <Typography
            data-testid="footerpanel-labels-recipesteps"
            id="footerpanel-labels-recipesteps"
            component="span"
          >
            {`${T.translate(`${PREFIX}.recipeSteps`)}`}
          </Typography>
          <Typography
            className={classes.recipeStepsCount}
            id="footerpanel-labels-recipeStepsCount"
            data-testid="footerpanel-labels-recipeStepsCount"
            component="span"
          >
            {recipeStepsCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
