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
import { useStyles } from 'components/DrawerWidget/styles';
import { UnderLine } from 'components/DrawerWidget/iconStore';
import { IDrawerWidgetHeadingProps } from 'components/DrawerWidget/types';
import { FlexBoxContainer } from 'components/common/BoxContainer';
import { SimpleBoldLabel } from 'components/common/TypographyText';

export default function({ headingText }: IDrawerWidgetHeadingProps) {
  const classes = useStyles();

  return (
    <FlexBoxContainer sx={{flexDirection: 'column'}}>
      <SimpleBoldLabel component="p" size="20px" dataTestId="drawer-heading" text={headingText} />
      {UnderLine}
    </FlexBoxContainer>
  );
}
