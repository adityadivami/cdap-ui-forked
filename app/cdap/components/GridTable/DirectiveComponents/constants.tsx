import FilterComponent from './FilterComponent';
import ParseCSVComponent from './ParseComponent/ParseCSVComponent';
import ParseDateTimeComponent from './ParseComponent/ParseDateTimeComponent';
import ParseExcelComponent from './ParseComponent/ParseExcelComponent';
import ParseFixedLengthComponent from './ParseComponent/ParseFixedLengthComponent';
import ParseLogComponent from './ParseComponent/ParseLogComponent';
import ParseSimpleDateComponent from './ParseComponent/ParseSimpleDateComponent';
import ParseXMLToJSONComponent from './ParseComponent/ParseXMLToJSONComponent';
import CopyColumnComponent from './CopyColumnComponent';
import CustomExpressionComponent from './CustomTransformation';
import HashComponent from './HashComponent';
import FindAndReplace from './FindAndReplace';
import Concatenate from './ConcatenateComponent';
import DelimiterExtractExplode from './DelimiterForExplode_Extract';
import UsingPatternExtract from './UsingPattern_Extract';
import DefineVariable from './DefineVariable';
import SendToError from './SendToError';
import SetCounter from './SetCounterAction';
import FillNullOrEmpty from './FillNullOrEmpty';
import JoinColumn from './JoinColumns';

export const DIRECTIVE_COMPONENTS = [
  {
    type: 'filter',
    component: FilterComponent,
  },
  {
    type: 'parseCSV',
    component: ParseCSVComponent,
  },
  {
    type: 'parseLog',
    component: ParseLogComponent,
  },
  {
    type: 'parseSimpleDate',
    component: ParseSimpleDateComponent,
  },
  {
    type: 'parseDateTime',
    component: ParseDateTimeComponent,
  },
  {
    type: 'parseFixedLength',
    component: ParseFixedLengthComponent,
  },
  {
    type: 'parseXML',
    component: ParseXMLToJSONComponent,
  },
  {
    type: 'parseJSON',
    component: ParseXMLToJSONComponent,
  },
  {
    type: 'parseExcel',
    component: ParseExcelComponent,
  },
  {
    type: 'copyColumn',
    component: CopyColumnComponent,
  },
  {
    type: 'customTransform',
    component: CustomExpressionComponent,
  },
  {
    type: 'hash',
    component: HashComponent,
  },
  {
    type: 'findAndReplace',
    component: FindAndReplace,
  },
  {
    type: 'concatenate',
    component: Concatenate,
  },
  {
    type: 'delimited-text',
    component: DelimiterExtractExplode,
  },
  {
    type: 'using-delimiters',
    component: DelimiterExtractExplode,
  },
  {
    type: 'using-patterns',
    component: UsingPatternExtract,
  },
  {
    type: 'define-variable',
    component: DefineVariable,
  },
  {
    type: 'send-to-error',
    component: SendToError,
  },
  {
    type: 'set-counter',
    component: SetCounter,
  },
  {
    type: 'dateTime',
    component: ParseSimpleDateComponent,
  },
  {
    type: 'dateTimeAsString',
    component: ParseDateTimeComponent,
  },
  {
    type: 'fillNullOrEmpty',
    component: FillNullOrEmpty,
  },
  {
    type: 'join-columns',
    component: JoinColumn,
  },
];

export const PLEASE_SELECT_THE_LOGS_FORMAT = 'Please select the logs format';
export const PLEASE_SELECT_THE_DATE_FORMAT = 'Please select the date format';
export const PARSE_AS_FIXED_LENGTH = 'Parse as Fixed length';
export const COLUMN_WIDTHS = 'Column widths';
export const PADDING = 'Padding';
export const COLUMN_WIDTHS_PLACEHOLDER = 'e.g. 3, 5, 2, 5, 15';
export const PADDING_PLACEHOLDER = 'Optional padding parameter';
export const PARSE_AS_XML_TO_JSON = 'Parse as XML to JSON';
export const DEPTH = 'Depth';
export const DEPTH_PLACEHOLDER = 'Enter depth';
export const CHOOSE_SHEET_IN_EXCEL =
  'Choose how you would like to specify the sheet in your Excel file';
export const SHEET_NUMBER_PLACEHOLDER = 'Sheet number';
export const SHEET_NAME_PLACEHOLDER = 'Sheet name';
export const PLEASE_SELECT_THE_DELIMITER = 'Please select the delimiter';
export const COMMA = 'Comma';
export const TAB = 'Tab';
export const SPACE = 'Space';
export const PIPE = 'Pipe';
export const CAP_A = '^A';
export const CAP_D = '^D';
export const CUSTOM_DELIMITER = 'Custom delimiter';
export const SET_FIRST_ROW_AS_HEADER = 'Set first row as header';
export const NAME_NEW_COLUMN = 'Name new column';
export const DESTINATION_COLUMN = 'Destination column';
export const COLUMN_NAME_EXIST = 'Column name already exist';
export const TYPE_CUSTOM_EXPRESSION = 'Type the custom expression to transform';
export const EXAMPLE_CUSTOM_EXP =
  'E.g. math:sin(column_name), empty(arg), column_name+<column>, etc.';
export const ENCODE = 'Encode';
export const SELECT_HASH_ALGO = 'Select hash algorithm';
export const FIND = 'Find';
export const OLD_VALUE = 'Old Value';
export const IGNORE_CASE = 'Ignore case';
export const EXACT_MATCH = 'Exact Match';
export const REPLACE_WITH = 'Replace with';
export const NEW_VALUE = 'New value';
export const ADD = 'Add';
export const ENTER_STRING = 'Enter string';
export const COPY_TO_NEW_COLUMN = 'Copy to a new column';
export const SELECT_ACTION = 'Select action to take';
export const EXTRACT_FIELD_PATTERN = 'Extract fields using patterns';
export const SELECT_PATTERN = 'Select a pattern to extract from the column';
export const EXTRACT_NUMBERS_WITH = 'Extract numbers with';
export const EXTRACT_TEXT_START_WITH = 'Extract text that start with';
export const AND_END_WITH = 'and end with';
export const WRITE_YOUR_OWN_REGEX = 'Write your own regex pattern';
export const SET_VARIABLE_NAME = 'Set variable name';
export const CHOOSE_VARIABLE_Value = 'Choose variable value';
export const SELECT_ROW_WHERE = 'Select row where';
export const SELECT_COLUMN_SELECTED_ROW = 'Select column in selected row';
export const SEND_TO_ERROR = 'Send to error if';
export const INCREMENT_COUNT_BY = 'Increment the count by';
export const NAME_THIS_COUNTER = 'Name this counter';
export const FILL_NULL_EMPTY = 'Fill null or empty cell';
export const SET_ORDER = 'Set order';
export const CHOOSE_DELIMITER = 'Choose delimiter';
