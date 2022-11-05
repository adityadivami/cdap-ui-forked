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
import React from 'react';
import T from 'i18n-react';
import { useStyles } from 'components/FooterPanel/Components/RecipeStepsTab/styles';

const PREFIX = 'features.FooterPanel.labels';

export default function({ recipeStepsCount }) {
  const classes = useStyles();

  return (
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
  );
}
