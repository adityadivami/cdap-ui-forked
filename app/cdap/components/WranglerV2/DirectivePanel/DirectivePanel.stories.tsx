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
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DirectivePanel from 'components/WranglerV2/DirectivePanel';

export default {
  title: 'DirectivePanel',
  component: DirectivePanel,
} as ComponentMeta<typeof DirectivePanel>;

const handleSearchResultClick = () => action('clicked')('handleSearchResultClick');

const resultsList = [
  {
    primaryText: 'Alpha',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: true,
  },
  {
    primaryText: 'Bravo',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: true,
  },
  {
    primaryText: 'Charlie',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: true,
  },
  {
    primaryText: 'Delta',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: true,
  },
  {
    primaryText: 'Echo',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: true,
  },
  {
    primaryText: 'Foxtrot',
    secondaryText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: true,
  },
];

// below styled component is just for testing purpose
const DirectiveWrapper = styled(Box)`
  margin-top: 400px;
`;

export const Default: ComponentStory<typeof DirectivePanel> = (args) => {
  return (
    <DirectiveWrapper>
      <DirectivePanel {...args} />
    </DirectiveWrapper>
  );
};

Default.args = {
  directiveSuggestion: {
    usage: 'parse-as-log :column format',
    link: 'https://cdap.atlassian.net/wiki/spaces/DOCS/overview',
  },
  resultsList,
  handleSearchResultClick,
};
