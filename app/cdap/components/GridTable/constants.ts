import Concatenate from 'components/GridTable/components/DirectiveComponents/Concatenate';
import ParseDateTimeComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseDateTimeComponent';
import ParseSimpleDateComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseSimpleDateComponent';
import T from 'i18n-react';

export const MISSING_NULL = 'Missing/Null';
export const ADD = `${T.translate(
  'features.WranglerNewUI.Transformations.Transformations.format.options.concatenate.labels.add'
).toString()}`;
export const ENTER_STRING = `${T.translate(
  'features.WranglerNewUI.Transformations.Transformations.format.options.concatenate.labels.enterString'
).toString()}`;
export const COPY_TO_NEW_COLUMN = `${T.translate(
  'features.WranglerNewUI.Transformations.Transformations.format.options.concatenate.labels.copyToNewColumn'
).toString()}`;
export const DESTINATION_COLUMN = `${T.translate(
  'features.WranglerNewUI.Transformations.Transformations.format.options.concatenate.labels.destinationColumn'
).toString()}`;
export const PLEASE_SELECT_THE_DATE_FORMAT = `${T.translate(
  'features.WranglerNewUI.Transformations.parse.options.common.pleaseSelectTheDateFormat'
).toString()}`;
export const CUSTOM_FORMAT = 'customFormat';

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
