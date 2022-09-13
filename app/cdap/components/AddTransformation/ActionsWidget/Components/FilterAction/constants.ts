export const OPTIONS_MAP = [
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

export const DIRECTIVES_MAP = {
  KEEP: {
    EMPTY: 'filter-rows-on condition-false',
    TEXTEXACTLY: 'filter-rows-on regex-not-match',
    TEXTCONTAINS: 'filter-rows-on regex-not-match',
    TEXTSTARTSWITH: 'filter-rows-on condition-false',
    TEXTENDSWITH: 'filter-rows-on condition-false',
    TEXTREGEX: 'filter-rows-on regex-not-match',
    CUSTOMCONDITION: 'filter-rows-on condition-false',
  },
  REMOVE: {
    EMPTY: 'filter-rows-on condition-true',
    TEXTEXACTLY: 'filter-rows-on regex-match',
    TEXTCONTAINS: 'filter-rows-on regex-match',
    TEXTSTARTSWITH: 'filter-rows-on condition-true',
    TEXTENDSWITH: 'filter-rows-on condition-true',
    TEXTREGEX: 'filter-rows-on regex-match',
    CUSTOMCONDITION: 'filter-rows-on condition-true',
  },
};
