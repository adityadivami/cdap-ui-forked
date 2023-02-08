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

const resultList = [
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

// below styled component is just for testing purpose
const DirectiveWrapper = styled(Box)`
  margin-top: 400px;
`;

const Template: ComponentStory<typeof DirectivePanel> = (args) => {
  return (
    <DirectiveWrapper>
      <DirectivePanel {...args} />
    </DirectiveWrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  directiveSuggestion: {
    usage: 'parse-as-log :column format',
    link: 'https://cdap.atlassian.net/wiki/spaces/DOCS/overview',
  },
  resultList,
  handleSearchResultClick,
};
