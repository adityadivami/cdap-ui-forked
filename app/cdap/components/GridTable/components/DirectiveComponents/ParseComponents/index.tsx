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
import { TickIcon } from 'components/AddTransformation/iconStore';
import { IParseComponentProps } from 'components/GridTable/components/DirectiveComponents/ParseComponents/types';
import { useStyles } from 'components/GridTable/components/DirectiveComponents/styles';
import React from 'react';

export default function({ sectionHeading, children }: IParseComponentProps) {
  const classes = useStyles();
  return (
    <section className={classes.functionSectionStyles}>
      <div className={classes.funtionSectionWrapperStyles}>
        <div className={classes.functionHeadingTextStyles}>{sectionHeading}</div>
        <Box className={classes.greenCheckIconStyles}>{TickIcon}</Box>
      </div>
      {children}
    </section>
  );
}
