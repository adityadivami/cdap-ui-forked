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
import ColumnViewPanelTab from 'components/FooterPanel/Components/ColumnViewPanelTab';
import DirectivesTab from 'components/FooterPanel/Components/DirectivesTab';
import RecipeStepsTab from 'components/FooterPanel/Components/RecipeStepsTab';
import TableMetaInfoTab from 'components/FooterPanel/Components/TableMetaInfoTab';
import ZoomTab from 'components/FooterPanel/Components/ZoomTab';
import { useStyles } from 'components/FooterPanel/styles';
import { IFooterPanelProps } from 'components/FooterPanel/types';
import React from 'react';

export default function({ recipeStepsCount, dataCounts }: IFooterPanelProps) {
  const classes = useStyles();

  return (
    <Box className={classes.containerProps}>
      <Box className={classes.innnerContainer}>
        <ColumnViewPanelTab />
        <TableMetaInfoTab {...dataCounts} />
        <ZoomTab />
        <DirectivesTab />
        <RecipeStepsTab recipeStepsCount={recipeStepsCount} />
      </Box>
    </Box>
  );
}
