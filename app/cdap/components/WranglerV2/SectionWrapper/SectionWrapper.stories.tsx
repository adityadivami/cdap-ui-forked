/*
 * Copyright © 2023 Cask Data, Inc.
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
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';
import SectionWrapper from 'components/WranglerV2/SectionWrapper';

export default {
  title: 'SectionWrapper',
  component: SectionWrapper,
} as ComponentMeta<typeof SectionWrapper>;

const transformationName = 'string';
const transformationInfoLink = 'https://mui.com/material-ui/material-icons/';
const columnsSelected: IHeaderNamesList[] = [];

const Template: ComponentStory<typeof SectionWrapper> = (args) => {
  return <SectionWrapper {...args} />;
};

export const AddTransformationStepPanel = Template.bind({});

AddTransformationStepPanel.args = {
  transformationName,
  transformationInfoLink,
  columnsSelected,
};
