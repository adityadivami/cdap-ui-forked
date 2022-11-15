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

import { Box, Container } from '@material-ui/core';
import styled from 'styled-components';

export const FlexJustifyAlignCenter = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LastDividerBox = styled(Box)`
  margin: 0px 0px 0px 4px;
`;

export const DividerBox = styled(Box)`
  margin: 0px 4px;
`;

export const FunctionBoxWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: -webkit-fill-available;
  & .MuiIconButton-root {
    padding-bottom: 8px;
  }
`;

export const SearchBoxWrapper = styled(Box)`
  min-width: 490px;
`;

export const ProgressBoxWrapper = styled(Box)`
  position: relative;
  margin: 4px;
  float: left;
  text-align: center;
`;

export const ProgressBoxInnerWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 60px;
  height: 30px;
  margin-bottom: -20px !important;
`;

export const SelectColumnWrapper = styled(Box)`
  height: 90%;
`;

export const SelectColumnInnerWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const PointerBox = styled(Box)`
  cursor: pointer;
`;

export const FlexWrapper = styled(Box)`
  display: flex;
`;

export const CenterAlignBox = styled(Box)`
  text-align: center;
`;

export const SelectColumnWidgetBox = styled(Box)`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const FlexAlignCenter = styled(Box)`
  display: flex;
  align-items: center;
`;

export const DrawerContainerInnerFlex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const BackIconBox = styled(Box)`
  cursor: pointer;
  margin-right: 10px;
`;

export const DrawerHeadWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const SelectColumnSearchBox = styled(Box)`
  position: relative;
  display: flex;
  margin-right: 10px;
`;

export const AddTransformationWrapper = styled(Container)`
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const AddTransformationBodyWrapper = styled(Box)`
  height: calc(100% - 40px);
  overflow-y: auto;
`;

export const DrawerContainerBox = styled(Container)`
  width: 460px;
  height: 100%;
  padding-left: 30px;
`;

export const TransformationNameBox = styled.section`
  padding: 15px 0;
  border-bottom: 1px solid #dadce0;
`;

export const TransformationNameHeadWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TransformationNameTextInfoWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 10px 0 0;
  ${PointerBox} {
    margin-left: 8px;
  }
`;

export const LabelWrapper = styled(Box)`
  margin: 10px 0;
`;
