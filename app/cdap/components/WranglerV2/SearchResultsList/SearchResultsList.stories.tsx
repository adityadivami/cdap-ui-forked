import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchResultList from 'components/WranglerV2/SearchResultsList';

export default {
  title: 'SearchResultList',
  component: SearchResultList,
};

const handleClick = (data) => action('clicked')(data);

export function Default(args) {
  return <SearchResultList {...args} />;
}

Default.args = {
  resultsList: [
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
    },
    {
      secondaryText: 'alpha bravo charlie',
      icon: true,
    },
  ],
  showIcon: false,
  handleClick,
};
