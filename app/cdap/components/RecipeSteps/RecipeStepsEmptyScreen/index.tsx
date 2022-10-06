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
import { Container } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RECIPE_STEPS_EMPTY_INFO_TEXT, START_WRANGLING_YOUR_DATA } from '../constants';
import { useStyles } from '../styles';

export const RecipeStepsEmptyScreen = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.emptyScreenStyles}>
      <img src="/cdap_assets/img/recipe-steps_infographic.svg" alt="Empty infographic" />
      <div className={classes.emptyScreenText}>{START_WRANGLING_YOUR_DATA}</div>
      <div className={classes.emptyScreenInfoText}>{RECIPE_STEPS_EMPTY_INFO_TEXT}</div>
    </Container>
  );
};
