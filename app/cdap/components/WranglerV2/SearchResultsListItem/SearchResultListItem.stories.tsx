import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchResultListItem from 'components/WranglerV2/SearchResultsListItem';

export default {
  title: 'SearchResultListItem',
  component: SearchResultListItem,
};

const handleClick = () => action('clicked')('Search item clicked');

export function Default(args) {
  return <SearchResultListItem {...args} />;
}

Default.args = {
  primaryText: 'parse-as-log',
  secondaryText: 'Parses Apache HTTPD and NGINX logs',
  icon: true,
  onClick: handleClick,
};

export function Secondary(args) {
  return <SearchResultListItem {...args} />;
}

Secondary.args = {
  primaryText: 'parse-as-log',
  secondaryText: 'Parses Apache HTTPD and NGINX logs',
  icon: false,
  onClick: handleClick,
};
