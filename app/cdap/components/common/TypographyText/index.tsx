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

import { Typography } from '@material-ui/core';
import { grey, red, green } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';

export interface ITypographyTextProps {
  text: string;
  component?: string; 
  size?: string;
  weight?: number;
  dataTestId?: string;
}

const SimpleText = styled(Typography)`
  color: ${grey[700]};
  font-size: ${({ size }) => (size ? size : '14px')};
  font-weight: ${({ weight }) => (weight ? weight : 500)};
`;

export const SimpleLabel = ({
  text,
  component,
  size,
  weight,
  dataTestId,
}: ITypographyTextProps) => (
  <SimpleText data-testid={dataTestId} component={component} size={size} weight={weight}>
    {text}
  </SimpleText>
);

const ErrorText = styled(SimpleText)`
  color: ${red[600]};
`;

export const ErrorLabel = ({ text, component, size, weight, dataTestId }: ITypographyTextProps) => (
  <ErrorText data-testid={dataTestId} component={component} size={size} weight={weight}>
    {text}
  </ErrorText>
);

const SuccessText = styled(SimpleText)`
  color: ${green[600]};
`;

export const SuccessLabel = ({
  text,
  component,
  size,
  weight,
  dataTestId,
}: ITypographyTextProps) => (
  <SuccessText data-testid={dataTestId} component={component} size={size} weight={weight}>
    {text}
  </SuccessText>
);

const SimpleBoldText = styled(SimpleText)`
  color: ${grey[900]};
`;

export const SimpleBoldLabel = ({
  text,
  component,
  size,
  weight,
  dataTestId,
}: ITypographyTextProps) => (
  <SimpleBoldText data-testid={dataTestId} component={component} size={size} weight={weight}>
    {text}
  </SimpleBoldText>
);
