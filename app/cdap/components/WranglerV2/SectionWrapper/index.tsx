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

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import SectionComponent from 'components/WranglerV2/SectionComponent';
import styled from 'styled-components';
import T from 'i18n-react';
import { Typography, Button, Divider } from '@material-ui/core';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';

export interface ISectionWrapperComponentProps {
  columnsSelected: IHeaderNamesList[];
  transformationName: string;
  transformationInfoLink: string;
}

const SubTitle = styled(Typography)`
  &&& {
    color: ${grey[700]};
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.1px;
    line-height: 22px;
  }
`;

const StyledButton = styled(Button)`
  &&& {
    color: #3367d6;
    float: left;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.46px;
    line-height: 26px;
    margin-top: 20px;
    margin-bottom: 30px;
    text-transform: none;
    width: 162px;
  }
`;

const InfoIconComponent = styled(InfoOutlinedIcon)`
  color: #3367d6;
  cursor: pointer;
  font-size: 20px;
  height: 20px;
  margin-left: 5px;
  margin-top: 13px;
  width: 20px;
`;

const TextInfoIconWrapper = styled.section`
  align-items: center;
  display: flex;
  padding: 0px;
  margin-bottom: 20px;
`;

const SectionBodyText = styled(Typography)`
  &&& {
    color: ${grey[700]};
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 24px;
    margin-top: 10px;
  }
`;

const StyledDivider = styled(Divider)`
  &&& {
    margin-top: 10px;
  }
`;

const ColumnName = styled(Typography)`
  &&& {
    color: ${grey[700]};
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 24px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const PREFIX = 'features.WranglerNewUI.AddTransformationStepPanel';

export default function SectionWrapper({
  columnsSelected,
  transformationName,
  transformationInfoLink,
}: ISectionWrapperComponentProps) {
  return (
    <>
      <SubTitle>
        {!Boolean(columnsSelected.length) && T.translate(`${PREFIX}.noColumnsSelected`)}
        {Boolean(columnsSelected.length) &&
          `${columnsSelected.length}  ${T.translate(`${PREFIX}.columnsSelected`)}`}
      </SubTitle>
      <StyledDivider />
      <SectionComponent title="Function" showDivider={true} showTickIcon={true}>
        <TextInfoIconWrapper>
          <SectionBodyText component="span">{transformationName}</SectionBodyText>
          <a href={transformationInfoLink}>
            <InfoIconComponent />
          </a>
        </TextInfoIconWrapper>
      </SectionComponent>
      <SectionComponent
        title={T.translate(`${PREFIX}.selectColumnTitle`).toString()}
        showDivider={true}
        showTickIcon={Boolean(columnsSelected.length)}
      >
        <SubTitle>{T.translate(`${PREFIX}.selectColumnSubTitle`)}</SubTitle>
        {Boolean(columnsSelected.length) &&
          columnsSelected.map((selectedColumn, index) => {
            return (
              <ColumnName component="span">{`${index + 1}. ${selectedColumn.label}`}</ColumnName>
            );
          })}
        {!Boolean(columnsSelected.length) && (
          <StyledButton color="primary" variant="outlined">
            {T.translate(`${PREFIX}.selectColumns`)}
          </StyledButton>
        )}
      </SectionComponent>
    </>
  );
}
