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
import { ITypographyTextProps } from 'components/common/TypographyText/types';
import React from 'react';
import styled from 'styled-components';

const SimpleText = styled(Typography)`
  color: ${grey[700]};
  font-size: ${({ size }) => (size ? size : '14px')};
  font-weight: ${({ weight }) => (weight ? weight : 500)};
`;

const ErrorText = styled(SimpleText)`
  color: ${red[600]};
`;

const SuccessText = styled(SimpleText)`
  color: ${green[600]};
`;

const SimpleBoldText = styled(SimpleText)`
  color: ${grey[900]};
`;

export default function({ text, type, component, size, weight, dataTestId }: ITypographyTextProps) {
  return (
    <>
      {type === 'simple' && (
        <SimpleText data-testid={dataTestId} component={component} size={size} weight={weight}>
          {text}
        </SimpleText>
      )}
      {type === 'error' && (
        <ErrorText data-testid={dataTestId} component={component} size={size} weight={weight}>
          {text}
        </ErrorText>
      )}
      {type === 'success' && (
        <SuccessText data-testid={dataTestId} component={component} size={size} weight={weight}>
          {text}
        </SuccessText>
      )}
      {type === 'simpleBold' && (
        <SimpleBoldText data-testid={dataTestId} component={component} size={size} weight={weight}>
          {text}
        </SimpleBoldText>
      )}
    </>
  );
}
