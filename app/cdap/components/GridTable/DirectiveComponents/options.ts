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
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: 'dd/MM/yy HH:mm:ss',
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: "yyyy,MM.dd'T'HH:mm:ss.SSS with RFC timezone",
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

export const DEFINE_VARIABLE_OPTIONS = [
  {
    label: 'value is',
    value: 'TEXTEXACTLY',
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

export const SEND_TO_ERROR_OPTIONS = [
  {
    label: 'value is empty',
    value: 'EMPTY',
  },

  {
    label: 'value is',
    value: 'TEXTEXACTLY',
    extraInput: {
      show: true,
      placeholder: 'Enter value',
      ignoreCase: true,
    },
  },
  {
    label: 'value contains',
    value: 'TEXTCONTAINS',
    extraInput: {
      show: true,
      placeholder: 'Enter Contained value',
      ignoreCase: true,
    },
  },
  {
    label: 'value starts with',
    value: 'TEXTSTARTSWITH',
    extraInput: {
      show: true,
      placeholder: 'Enter prefix',
      ignoreCase: true,
    },
  },
  {
    label: 'value ends with',
    value: 'TEXTENDSWITH',
    extraInput: {
      show: true,
      placeholder: 'Enter suffix',
      ignoreCase: true,
    },
  },
  {
    label: 'value contains regex',
    value: 'TEXTREGEX',
    extraInput: {
      show: true,
      placeholder: 'Enter regex',
      ignoreCase: false,
    },
  },

  {
    label: 'value is number',
    value: 'ISNUMBER',
  },
  {
    label: 'value is not number',
    value: 'ISNOTNUMBER',
  },
  {
    label: 'value is double',
    value: 'ISDOUBLE',
  },
  {
    label: 'value is not double',
    value: 'ISNOTDOUBLE',
  },
  {
    label: 'value is integer',
    value: 'ISINTEGER',
  },
  {
    label: 'value is not integer',
    value: 'ISNOTINTEGER',
  },
  {
    label: 'value is boolean',
    value: 'ISBOOLEAN',
  },
  {
    label: 'value is not boolean',
    value: 'ISNOTBOOLEAN',
  },
  {
    label: 'value is date',
    value: 'ISDATE',
  },
  {
    label: 'value is not date',
    value: 'ISNOTDATE',
  },
  {
    label: 'value is date format',
    value: 'ISDATEFORMAT',
  },
  {
    label: 'value is not date format',
    value: 'ISNOTDATEFORMAT',
  },
  {
    label: 'value is time',
    value: 'ISTIME',
  },
  {
    label: 'value is not time',
    value: 'ISNOTTIME',
  },
  {
    label: 'value is IP',
    value: 'ISIP',
  },
  {
    label: 'value is not IP',
    value: 'ISNOTIP',
  },
  {
    label: 'value is IPV4',
    value: 'ISIPV4',
  },
  {
    label: 'value is not IPV4',
    value: 'ISNOTIPV4',
  },
  {
    label: 'value is IPV6',
    value: 'ISIPV6',
  },
  {
    label: 'value is not IPV6',
    value: 'ISNOTIPV6',
  },
  {
    label: 'value is email',
    value: 'ISEMAIL',
  },
  {
    label: 'value is not email',
    value: 'ISNOTEMAIL',
  },
  {
    label: 'value is URL',
    value: 'ISURL',
  },
  {
    label: 'value is not URL',
    value: 'ISNOTURL',
  },
  {
    label: 'value is domain name',
    value: 'ISDOMAINNAME',
  },
  {
    label: 'value is not domain name',
    value: 'ISNOTDOMAINNAME',
  },
  {
    label: 'value is domain TLD',
    value: 'ISDOMAINTLD',
  },
  {
    label: 'value is not domain TLD',
    value: 'ISNOTDOMAINTLD',
  },
  {
    label: 'value is generic TLD',
    value: 'ISGENERICTLD',
  },
  {
    label: 'value is not generic TLD',
    value: 'ISNOTGENERICTLD',
  },
  {
    label: 'value is country TLD',
    value: 'ISCOUNTRYTLD',
  },
  {
    label: 'value is not country TLD',
    value: 'ISNOTCOUNTRYTLD',
  },
  {
    label: 'value is ISBN',
    value: 'ISISBN',
  },
  {
    label: 'value is not ISBN',
    value: 'ISNOTISBN',
  },
  {
    label: 'value is ISBN10',
    value: 'ISISBN10',
  },
  {
    label: 'value is not ISBN10',
    value: 'ISNOTISBN10',
  },
  {
    label: 'value is ISBN13',
    value: 'ISISBN13',
  },
  {
    label: 'value is not ISBN13',
    value: 'ISNOTISBN13',
  },
  {
    label: 'value is credit card',
    value: 'ISCREDITCARD',
  },
  {
    label: 'value is not credit card',
    value: 'ISNOTCREDITCARD',
  },
  {
    label: 'value is American Express card',
    value: 'ISAMEXCARD',
  },
  {
    label: 'value is not American Express card',
    value: 'ISNOTAMEXCARD',
  },
  {
    label: 'value is Visa card',
    value: 'ISVISACARD',
  },
  {
    label: 'value is not Visa Card',
    value: 'ISNOTVISACARD',
  },
  {
    label: 'value is Master card',
    value: 'ISMASTERCARD',
  },
  {
    label: 'value is not Master card',
    value: 'ISNOTMASTERCARD',
  },
  {
    label: 'value is Diner card',
    value: 'ISDINERCARD',
  },
  {
    label: 'value is not Diner card',
    value: 'ISNOTDINERCARD',
  },
  {
    label: 'value is VPay card',
    value: 'ISVPAYCARD',
  },
  {
    label: 'value is not VPay card',
    value: 'ISNOTVPAYCARD',
  },
  {
    label: 'Custom condition',
    value: 'CUSTOMCONDITION',
    extraInput: {
      show: true,
      placeholder: 'E.g. body < 30 || gender == "Male" ',
      ignoreCase: false,
    },
  },
];

export const SET_COUNTER_OPTION = [
  {
    label: 'Always',
    value: 'true',
  },
  {
    label: 'If condition is true',
    value: 'custom',
  },
];

export const hashAlgorithmOptions = [
  'BLAKE2B-160',
  'BLAKE2B-256',
  'BLAKE2B-384',
  'BLAKE2B-512',
  'GOST3411',
  'GOST3411-2012-256',
  'GOST3411-2012-512',
  'KECCAK-224',
  'KECCAK-256',
  'KECCAK-288',
  'KECCAK-384',
  'KECCAK-512',
  'MD2',
  'MD4',
  'MD5',
  'RIPEMD128',
  'RIPEMD160',
  'RIPEMD256',
  'RIPEMD320',
  'SHA',
  'SHA-1',
  'SHA-224',
  'SHA-256',
  'SHA-384',
  'SHA-512',
  'SHA-512/224',
  'SHA-512/256',
  'SHA3-224',
  'SHA3-256',
  'SHA3-384',
  'SHA3-512',
  'Skein-1024-1024',
  'Skein-1024-384',
  'Skein-1024-512',
  'Skein-256-128',
  'Skein-256-160',
  'Skein-256-224',
  'Skein-256-256',
  'Skein-512-128',
  'Skein-512-160',
  'Skein-512-224',
  'Skein-512-256',
  'Skein-512-384',
  'Skein-512-512',
  'SM3',
  'Tiger',
  'WHIRLPOOL',
];
