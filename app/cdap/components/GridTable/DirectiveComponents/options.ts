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

export const DELIMITER_OPTION_EXPLODE_EXTRACT = [
  {
    value: ',',
    label: 'Comma',
  },
  {
    value: '\\t',
    label: 'Tab',
  },
  {
    value: '\\s+',
    label: 'Whitespace',
  },
  {
    value: '\\|',
    label: 'Pipe',
  },
  {
    value: 'customDelimiter',
    label: 'Custom delimiter',
  },
];

export const USING_PATTERN_OPTIONS = [
  {
    label: 'Credit cards',
    value: `((?:\\d{4}[-\\s]?){4})`,
    patternName: 'creditcard',
  },
  {
    label: 'Date',
    value: `((?:(?:\\d{4}|\\d{2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))|(?:(?:(?:\\d{1,2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))|(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{4}|\\d{2})))`,
    patternName: 'date',
  },
  {
    label: 'Date Time',
    value: `((?:(?:(?:\\d{4}|\\d{2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))|(?:(?:(?:\\d{1,2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))|(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{4}|\\d{2})))[T\\s](?:(?:(?:2[0-3])|(?:[01]?\\d))[h:\\s][0-5]\\d(?::(?:(?:[0-5]\\d)|(?:60)))?(?:\\s[aApP][mM])?(?:Z|(?:[+-](?:1[0-2])|(?:0?\\d):[0-5]\\d)|(?:\\s[[a-zA-Z]\\s]+))?))`,
    patternName: 'datetime',
  },
  {
    label: 'Email',
    value: `([a-zA-Z0-9!#$%&*+/=?^_\`'{|}~-]+@(?!.*\\.{2})[a-zA-Z0-9\\.-]+(?:\\.[a-zA-Z]{2,6})?)`,
    patternName: 'email',
  },
  {
    label: 'URL from HTML anchors',
    value: `<[aA](?:\\s+[a-zA-Z]+=".*?")*\\s+[hH][rR][eE][fF]="(.*?)"(?:\\s+[a-zA-Z]+=".*?")*>(?:.*)<\/[aA]>`,
    patternName: 'htmlhyperlink',
  },
  {
    label: 'IPv4 address',
    value: `((?:(?:0|(?:25[0-5])|(?:2[0-4][1-9])|(?:1\\d\\d)|(?:[1-9]\\d?))\\.){3}(?:(?:0|(?:25[0-5])|(?:2[0-4][1-9])|(?:1\\d\\d)|(?:[1-9]\\d?))))`,
    patternName: 'ipv4',
  },
  {
    label: 'ISBN codes',
    value: `((?:97[89]-?)?(?:\\d-?){9}[\\dxX])`,
    patternName: 'isbncodes',
  },
  {
    label: 'Mac addresses',
    value: `((?:\\p{XDigit}{2}[:-]){5}(?:\\p{XDigit}{2}))`,
    patternName: 'macaddress',
  },
  {
    label: 'N digits number',
    value: null,
    patternName: 'ndigitnumber',
  },
  {
    label: 'U.S. Phone numbers',
    value: `((?:\\+\\d{1,3}[\\s-]?)?\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4})`,
    patternName: 'phonenumber',
  },
  {
    label: 'SSN',
    value: `(\\d{3}[-\\s]?\\d{2}[-\\s]?\\d{4})`,
    patternName: 'ssn',
  },
  {
    label: 'Start/End Patterns',
    value: null,
    patternName: 'startend',
  },
  {
    label: 'Time',
    value: `((?:(?:2[0-3])|(?:[01]?\\d))[h:\\s][0-5]\\d(?::(?:(?:[0-5]\\d)|(?:60)))?(?:\\s[aApP][mM])?(?:Z|(?:[+-](?:1[0-2])|(?:0?\\d):[0-5]\\d)|(?:\\s[[a-zA-Z]\\s]+))?)`,
    patternName: 'time',
  },
  {
    label: 'UPS codes',
    value: `(1Z\\s?[0-9a-zA-Z]{3}\\s?[0-9a-zA-Z]{3}\\s?[0-9a-zA-Z]{2}\\s?\\d{4}\\s?\\d{4})`,
    patternName: 'upscodes',
  },
  {
    label: 'URL',
    value: `((?:(?:http[s]?|ftp):\/)?\/?(?:[^\/\\s]+)(?:(?:\/\\w+)*\/)(?:[\\w\-\.]+[^#?\\s]+)(?:.*)?)`,
    patternName: 'url',
  },
  {
    label: 'U.S. zip codes',
    value: `[^\\d]?([0-9]{5}(?:-[0-9]{4})?)[^\\d]?`,
    patternName: 'zipcode',
  },
  {
    label: 'Custom',
    value: null,
    patternName: 'custom',
  },
];
