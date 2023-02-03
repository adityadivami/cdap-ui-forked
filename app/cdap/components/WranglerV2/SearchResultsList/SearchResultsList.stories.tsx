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
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchResultList from 'components/WranglerV2/SearchResultsList';

export default {
  title: 'SearchResultList',
  component: SearchResultList,
} as ComponentMeta<typeof SearchResultList>;

const handleClick = (data) => action('clicked')(data);

const resultsList = [
  {
    primaryText: 'parse-as-fixed-length',
    secondaryText: 'Parses fixed-length records using the specified widths and padding-character',
    icon: true,
  },
  {
    primaryText: 'parse-as-log',
    secondaryText: 'Parses Apache HTTPD and NGINX logs',
    icon: true,
  },
  {
    primaryText: 'parse-xml-to-json',
    secondaryText: 'Parses a XML document to JSON representation',
    icon: true,
  },
  {
    secondaryText: 'Customer Name',
    icon: true,
  },
  {
    secondaryText: 'Credit card number',
    icon: true,
  },
  {
    secondaryText: 'Purchase date',
    icon: true,
  },
];

export const Template: ComponentStory<typeof SearchResultList> = (args) => {
  return <SearchResultList {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  resultsList,
  showIcon: false,
  handleClick,
};
