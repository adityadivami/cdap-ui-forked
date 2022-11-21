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
import T from 'i18n-react';
import { TickIcon } from 'components/WranglerGrid/AddTransformation/IconStore/tickIcon';
import { ADD_TRANSFORMATION_PREFIX } from 'components/WranglerGrid/AddTransformation/constants';
import { SubHeadNormalFont, SubHeadBoldFont } from 'components/common/TypographyText';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import styled from 'styled-components';
import { blue } from '@material-ui/core/colors';

const TransformationNameBox = styled.section`
  padding: 15px 0;
  border-bottom: 1px solid #dadce0;
`;

const TransformationNameHeadWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TransformationNameTextInfoWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 10px 0 0;
`;

const InfoIconComponent = styled(InfoOutlinedIcon)`
  margin-left: 5px;
  color: ${blue[500]};
  cursor: pointer;
`;

export default function({ transformationName }: { transformationName: string }) {
  return (
    <TransformationNameBox>
      <TransformationNameHeadWrapper>
        <SubHeadBoldFont component="p" data-testid="function-name-head">
          {T.translate(`${ADD_TRANSFORMATION_PREFIX}.function`)}
        </SubHeadBoldFont>
        {TickIcon}
      </TransformationNameHeadWrapper>
      <TransformationNameTextInfoWrapper>
        <SubHeadNormalFont component="span" data-testid="selected-function-name">
          {transformationName}
        </SubHeadNormalFont>
        <InfoIconComponent data-testid="info-link" />
      </TransformationNameTextInfoWrapper>
    </TransformationNameBox>
  );
}
