import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import React from 'react';
import DirectivePanel from '.';
import { Box } from '@material-ui/core';

export default {
  title: 'DirectivePanel',
  component: DirectivePanel,
};

const handleResultListItemClick = () => action('clicked')('handleResultListItemClick');
const handleSearchResultClick = () => action('clicked')('handleSearchResultClick');

// below styled component is just for testing purpose
const DirectiveWrapper = styled(Box)`
  margin-top: 400px;
`;

export function Default(args) {
  return (
    <DirectiveWrapper>
      <DirectivePanel {...args} />
    </DirectiveWrapper>
  );
}

Default.args = {
  directiveSuggestion: {
    usage: 'parse-as-log :column format',
    link: 'https://cdap.atlassian.net/wiki/spaces/DOCS/overview',
  },
  resultsList: [
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleResultListItemClick,
    },
  ],
  handleSearchResultClick,
};
