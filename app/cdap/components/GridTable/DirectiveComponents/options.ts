export const PARSE_CSV_OPTIONS = [
  {
    value: 'comma',
    label: 'Comma',
  },
  {
    value: 'tab',
    label: 'Tab',
  },
  {
    value: 'space',
    label: 'Space',
  },
  {
    value: 'pipe',
    label: 'Pipe',
  },
  {
    value: 'capA',
    label: '^A',
  },
  {
    value: 'capD',
    label: '^D',
  },
  {
    value: 'customDelimiter',
    label: 'Custom delimiter',
  },
];

export const PARSE_LOG_OPTIONS = [
  {
    value: 'common',
    label: 'Common',
  },
  {
    value: 'combined',
    label: 'Combined',
  },
  {
    value: 'combinedio',
    label: 'Combinedio',
  },
  {
    value: 'referer',
    label: 'Referer',
  },
  {
    value: 'agent',
    label: 'Agent',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
];

export const PARSE_SIMPLE_DATE_OPTIONS = [
  {
    label: 'MM/dd/yyyy',
    value: 'MM/dd/yyyy',
  },
  {
    label: 'dd/MM/yyyy',
    value: 'dd/MM/yyyy',
  },
  {
    label: 'MM-dd-yyyy',
    value: 'MM-dd-yyyy',
  },
  {
    label: 'MM-dd-yy',
    value: 'MM-dd-yy',
  },
  {
    label: 'yyyy-MM-dd',
    value: 'yyyy-MM-dd',
  },
  {
    label: 'yyyy-MM-dd HH:mm:ss',
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: "MM-dd-yyyy 'at' HH:mm:ss z",
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: 'dd/MM/yy HH:mm:ss',
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: 'MM.dd.yyyy HH:mm:ss.SSS',
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: 'EEE, d MMM yyyy HH:mm:ss',
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: "EEE, MMM d, ''yy",
    value: "EEE, MMM d, ''yy",
  },
  {
    label: 'h:mm a',
    value: 'h:mm a',
  },
  {
    label: 'H:mm a, z',
    value: 'H:mm a, z',
  },
  {
    label: 'Custom Format',
    value: 'customFormat',
  },
];

export const PARSE_DATE_TIME_OPTIONS = [
  {
    label: 'yyyy-MM-dd HH:mm:ss',
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: "MM-dd-yyyy 'at' HH:mm:ss with timezone",
    value: "MM-dd-yyyy 'at' HH:mm:ss with timezone",
  },
  {
    label: 'dd/MM/yy HH:mm:ss',
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: "yyyy,MM.dd'T'HH:mm:ss.SSS with RFC timezone",
    value: "yyyy,MM.dd'T'HH:mm:ss.SSS with RFC timezone",
  },
  {
    label: 'MM.dd.yyyy HH:mm:ss.SSS',
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: 'EEE, d MMM yyyy HH:mm:ss',
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: 'Custom Format',
    value: 'customFormat',
  },
];

export const PARSE_EXCEL_OPTIONS = [
  {
    label: 'Sheet Number',
    value: 'sheetNumber',
  },
  {
    label: 'Sheet Name',
    value: 'sheetName',
  },
];

export const CONCATENATE_OPTIONS = [
  {
    label: 'at the beginning of the content of each row',
    value: 'BEGINNING',
  },
  {
    label: 'at the end of the content of each row',
    value: 'END',
  },
];

export const FILTER_RADIO_OPTION = [
  {
    label: 'Keep rows',
    value: 'KEEP',
  },
  {
    label: 'Remove rows',
    value: 'REMOVE',
  },
];

export const FILTER_OPTIONS = [
  {
    label: 'value is empty',
    value: 'EMPTY',
  },
  {
    label: 'value is',
    value: 'TEXTEXACTLY',
  },
  {
    label: 'value contains',
    value: 'TEXTCONTAINS',
  },
  {
    label: 'value starts with',
    value: 'TEXTSTARTSWITH',
  },
  {
    label: 'value ends with',
    value: 'TEXTENDSWITH',
  },
  {
    label: 'value contains regex',
    value: 'TEXTREGEX',
  },
  {
    label: 'custom condition',
    value: 'CUSTOMCONDITION',
  },
];

export const FILTER_PLACEHOLDER = {
  EMPTY: '',
  TEXTEXACTLY: 'Enter value',
  TEXTCONTAINS: 'Enter contained value',
  TEXTSTARTSWITH: 'Enter prefix',
  TEXTENDSWITH: 'Enter suffix',
  TEXTREGEX: 'Enter regex',
  CUSTOMCONDITION: 'E.g. < 30 || gender == "Male"',
};
