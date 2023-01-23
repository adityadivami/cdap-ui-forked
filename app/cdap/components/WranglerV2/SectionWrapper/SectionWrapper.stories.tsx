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

import SectionWrapper from 'components/WranglerV2/SectionWrapper';
import React from 'react';

export default {
  title: 'SectionWrapper',
  component: SectionWrapper,
};

const transformationName: string = 'string';
const transformationInfoLink: string = 'https://mui.com/material-ui/material-icons/';
const columnsSelected = [];

export function AddTransformationStepPanel(args) {
  return <SectionWrapper {...args} />;
}

AddTransformationStepPanel.args = {
  transformationName,
  transformationInfoLink,
  columnsSelected,
};
