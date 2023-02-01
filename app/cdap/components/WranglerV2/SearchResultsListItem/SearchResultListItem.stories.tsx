import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import SearchResultListItem from '.';

export default {
  title: 'SearchResultListItem',
  component: SearchResultListItem,
};

const handleInputChangeClick = () => action('clicked')('onChange');

export function Default(args) {
  return <SearchResultListItem {...args} />;
}

Default.args = {
  primaryText: 'parse-as-log',
  secondaryText: 'Parses Apache HTTPD and NGINX logs',
  icon: true,
  onClick: handleInputChangeClick,
};

export function Secondary(args) {
  return <SearchResultListItem {...args} />;
}

Secondary.args = {
  primaryText: 'parse-as-log',
  secondaryText: 'Parses Apache HTTPD and NGINX logs',
  icon: false,
  onClick: handleInputChangeClick,
};
