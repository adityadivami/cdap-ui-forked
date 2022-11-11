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

import { Container, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useStyles } from 'components/RecipeSteps/styles';
import T from 'i18n-react';
import { InfoGraphicData } from 'components/RecipeSteps/iconStore';

export default function() {
  const classes = useStyles();

  return (
    <Container className={classes.emptyScreenStyles} data-testid='recipe-steps-empty-screen-parent'>
      {InfoGraphicData}
      <Typography className={classes.emptyScreenText} data-testid='start-wrangle-title'>
        {T.translate('features.WranglerNewRecipeSteps.startWrangleTitle')}
      </Typography>
      <Typography className={classes.emptyScreenInfoText} data-testid='start-wrangle-sub-title'>
        {T.translate('features.WranglerNewRecipeSteps.startWrangleSubTitle')}
      </Typography>
    </Container>
  );
}
