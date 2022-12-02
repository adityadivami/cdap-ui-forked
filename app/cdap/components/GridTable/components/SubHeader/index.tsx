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

import { Box, Breadcrumbs, Button, IconButton } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import T from 'i18n-react';
import React from 'react';
import styled from 'styled-components';
import IngestViewSchemaDropDown from 'components/GridTable/components/IngestViewSchemaDropDown';

const CreatePipelineButton = styled(Button)`
  width: 162px;
  height: 36px;
  background-color: ${blue[500]};
  box-shadow: 0px 2px 4px rgba(70, 129, 244, 0.15);
  border-radius: 4px;
  font-weight: 400;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  padding-top: 6px;
  margin-right: 0;
  text-transform: none;
  &:hover {
    background-color: ${blue[500]};
    box-shadow: none;
    color: #ffffff;
  }
  &:active {
    box-shadow: none;
    background-color: ${blue[500]};
  }
`;

const SubHeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  align-items: center;
`;

export default function({ children }) {
  return (
    <SubHeaderContainer>
      {children}
      <Breadcrumbs separator="">
        <IconButton>
          <a href="https://cdap.atlassian.net/wiki/spaces/DOCS/overview" target="_blank">
            <img src="/cdap_assets/img/helpIcon.svg" />
          </a>
        </IconButton>
        <IngestViewSchemaDropDown />
        <CreatePipelineButton disabled data-testid="create-pipeline-button">
          {T.translate('features.WranglerNewUI.Breadcrumb.labels.createPipeline')}
        </CreatePipelineButton>
      </Breadcrumbs>
    </SubHeaderContainer>
  );
}
