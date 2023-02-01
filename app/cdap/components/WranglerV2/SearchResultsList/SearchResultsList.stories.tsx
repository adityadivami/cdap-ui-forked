import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import SearchResultList from '.';

export default {
  title: 'SearchResultList',
  component: SearchResultList,
};

const handleClick = () => action('clicked')('clicked 1');
const handleClick2 = (data) => action('clicked')(data);

export function Default(args) {
  return <SearchResultList {...args} />;
}

Default.args = {
  resultsList: [
    {
      primaryText: 'test',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleClick,
    },
    {
      primaryText: 'test-2',
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleClick,
    },
    {
      secondaryText: 'alpha bravo charlie',
      icon: true,
      onClick: handleClick,
    },
  ],
  showIcon: false,
  handleClick: handleClick2,
};
