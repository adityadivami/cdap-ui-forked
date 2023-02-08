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
import SearchResultListItem from 'components/WranglerV2/SearchResultsListItem';

export default {
  title: 'SearchResultListItem',
  component: SearchResultListItem,
} as ComponentMeta<typeof SearchResultListItem>;

const handleClick = () => action('clicked')('Search item clicked');

const Template: ComponentStory<typeof SearchResultListItem> = (args) => {
  return <SearchResultListItem {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  primaryText: 'parse-as-log',
  secondaryText: 'Parses Apache HTTPD and NGINX logs',
  icon: true,
  onClick: handleClick,
};
