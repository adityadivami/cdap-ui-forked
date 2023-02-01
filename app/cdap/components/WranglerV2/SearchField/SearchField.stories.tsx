import { action } from '@storybook/addon-actions';
import React from 'react';
import SearchField from '.';

export default {
  title: 'SearchField',
  component: SearchField,
};

const handleInputChangeClick = () => action('clicked')('onChange');
const handleonPostfixIconClick = () => action('clicked')('prefix clicked');

export function Default(args) {
  return <SearchField {...args} />;
}

Default.args = {
  onPostfixIconClick: handleonPostfixIconClick,
  inputProps: {
    value: 'test',
    onchange: handleInputChangeClick,
    placeholder: 'Input a directive',
  },
  directiveSuggestion: {
    usage: 'parse-as-log :column format',
    link: 'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382042182/Encode',
  },
};
