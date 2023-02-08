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
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchField, { ISearchFieldProps } from 'components/WranglerV2/SearchField';

export default {
  title: 'SearchField',
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

const handleInputChangeClick = () => action('clicked')('onChange');
const handleOnPostfixIconClick = () => action('clicked')('prefix clicked');

const Template: ComponentStory<typeof SearchField> = (args) => {
  return <SearchField {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  onPostfixIconClick: handleOnPostfixIconClick,
  inputProps: {
    value: 'test',
    onChange: handleInputChangeClick,
    placeholder: 'Input a directive',
  },
  directiveSuggestion: {
    usage: 'parse-as-log :column format',
    link: 'https://cdap.atlassian.net/wiki/spaces/DOCS/overview',
  },
};
