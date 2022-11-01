import Concatenate from './components/DirectiveComponents/Concatenate';
import ParseDateTimeComponent from './components/DirectiveComponents/ParseComponents/ParseDateTimeComponent';
import ParseSimpleDateComponent from './components/DirectiveComponents/ParseComponents/ParseSimpleDateComponent';

export const MISSING_NULL = 'Missing/Null';
export const ADD = 'Add';
export const ENTER_STRING = 'Enter string';
export const COPY_TO_NEW_COLUMN = 'Copy to a new column';
export const DESTINATION_COLUMN = 'Destination column';
export const PLEASE_SELECT_THE_DATE_FORMAT = 'Please select the date format';

export const DIRECTIVE_COMPONENTS = [
  {
    type: 'concatenate',
    component: Concatenate,
  },
  {
    type: 'dateTime',
    component: ParseSimpleDateComponent,
  },
  {
    type: 'dateTimeAsString',
    component: ParseDateTimeComponent,
  },
];
