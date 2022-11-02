import { IParseOptions, ISubMenuOption } from 'components/GridTable/types';
import T from 'i18n-react';

export const PARSE_SIMPLE_DATE_OPTIONS: IParseOptions[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.MMddyyyy'
    ).toString()}`,
    value: 'MM/dd/yyyy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.ddMMyyyy'
    ).toString()}`,
    value: 'dd/MM/yyyy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.MMddyyyyFormat'
    ).toString()}`,
    value: 'MM-dd-yyyy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.MMddyy'
    ).toString()}`,
    value: 'MM-dd-yy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.yyyyMMdd'
    ).toString()}`,
    value: 'yyyy-MM-dd',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.yyyyMMddHHmmss'
    ).toString()}`,
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.MMddyyyyatHHmmssz'
    ).toString()}`,
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.ddMMyyHHmmss'
    ).toString()}`,
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.yyyyMMddTHHmmssSSSWithRFCTimezone'
    ).toString()}`,
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.MMddyyyyHHmmssSSS'
    ).toString()}`,
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.EEEdMMMyyyyHHmmss'
    ).toString()}`,
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.EEEMMMdyy'
    ).toString()}`,
    value: "EEE, MMM d, ''yy",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.hmma'
    ).toString()}`,
    value: 'h:mm a',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.simpleDate.options.Hmmaz'
    ).toString()}`,
    value: 'H:mm a, z',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.customFormat'
    ).toString()}`,
    value: 'customFormat',
  },
];

export const PARSE_DATE_TIME_OPTIONS: IParseOptions[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.yyyyMMddHHmmss'
    ).toString()}`,
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.dateTime.options.MMddyyyyAtHHmmssWithTimezone'
    ).toString()}`,
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.ddMMyyHHmmss'
    ).toString()}`,
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.yyyyMMddTHHmmssSSSWithRFCTimezone'
    ).toString()}`,
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.MMddyyyyHHmmssSSS'
    ).toString()}`,
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.EEEdMMMyyyyHHmmss'
    ).toString()}`,
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.common.customFormat'
    ).toString()}`,
    value: 'customFormat',
  },
];

export const PARSE_EXCEL_OPTIONS: IParseOptions[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.excel.options.sheetNumber'
    ).toString()}`,
    value: 'sheetNumber',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.parse.options.excel.options.sheetName'
    ).toString()}`,
    value: 'sheetName',
  },
];

export const CONCATENATE_OPTIONS: ISubMenuOption[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.concatenate.options.atTheBegining'
    ).toString()}`,
    value: 'BEGINNING',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.concatenate.options.atTheEnd'
    ).toString()}`,
    value: 'END',
  },
];
