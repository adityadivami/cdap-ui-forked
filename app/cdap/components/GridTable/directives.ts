import { DATATYPE_OPTIONS, CALCULATE_OPTIONS } from './components/NestedMenu/constants';
import DataPrepStore from 'components/DataPrep/store';

export const getDirective = (option, column) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === option)) {
    return `set-type :${column} ${option}`;
  } else if (option === 'delete') {
    return `drop ${column}`;
  } else if (option === 'keep') {
    return `keep ${column}`;
  } else if (option === 'uppercase') {
    return `uppercase :${column}`;
  } else if (option === 'lowercase') {
    return `lowercase :${column}`;
  } else if (option === 'titlecase') {
    return `titlecase :${column}`;
  } else if (option === 'ltrim') {
    return `ltrim :${column}`;
  } else if (option === 'rtrim') {
    return `rtrim :${column}`;
  } else if (option === 'trim') {
    return `trim :${column}`;
  } else if (option === 'last-4') {
    return maskLast4Digits(column);
  } else if (option === 'last-2') {
    return maskLast2Digits(column);
  } else if (option === 'shuffle') {
    return maskByShuffling(column);
  } else if (option === 'encode-base64') {
    return `encode base64 :${column}`;
  } else if (option === 'encode-base32') {
    return `encode base32 :${column}`;
  } else if (option === 'encode-hex') {
    return `encode hex :${column}`;
  } else if (option === 'encode-url') {
    return `url-encode :${column}`;
  } else if (option === 'decode-base64') {
    return `decode base64 :${column}`;
  } else if (option === 'decode-base32') {
    return `decode base32 :${column}`;
  } else if (option === 'decode-hex') {
    return `decode hex :${column}`;
  } else if (option === 'decode-url') {
    return `url-decode :${column}`;
  } else if (option === 'array-flattening') {
    return explodeByFlattening(column);
  } else if (option === 'record-flattening') {
    return explodeRecordByFlattening(column);
  } else if (option === 'character-encoding-utf8') {
    return `set-charset :${column} 'utf-8'`;
  } else if (option === 'character-encoding-utf16') {
    return `set-charset :${column} 'utf-16'`;
  } else if (option === 'character-encoding-us-ascii') {
    return `set-charset :${column} 'us-ascii'`;
  } else if (option === 'character-encoding-iso-8859-1') {
    return `set-charset :${column} 'iso-8859-1'`;
  } else if (option === 'character-encoding-utf16-be') {
    return `set-charset :${column} 'utf-16be'`;
  } else if (option === 'character-encoding-utf16-le') {
    return `set-charset :${column} 'utf-16le'`;
  } else if (option === 'parseHL7') {
    return `parse-as-hl7 :${column}`;
  } else if (option === 'parseAvro') {
    return `parse-as-avro-file :${column}`;
  } else if (option === 'remove-null-missing') {
    return `filter-rows-on condition-true ${column} == null || ${column} =~ "^\\W*$"`;
  } else if (option === 'remove-null') {
    return `filter-rows-on condition-true ${column} == null`;
  } else if (option === 'remove-missing') {
    return `filter-rows-on condition-true ${column} =~ "^\\W*$"`;
  } else {
    null;
  }
};

export const getDirectiveOnTwoInputs = (option, column, value) => {
  if (option === 'parseCSV') {
    return value;
  } else if (option === 'parseExcel') {
    return value;
  } else if (option === 'parseJSON') {
    return value;
  } else if (option === 'parseXML') {
    return value;
  } else if (option === 'parseLog') {
    return value;
  } else if (option === 'parseSimpleDate') {
    return value;
  } else if (option === 'parseDateTime') {
    return value;
  } else if (option === 'parseFixedLength') {
    return value;
  } else if (option === 'hash') {
    return value;
  } else if (option === 'filter') {
    return value;
  } else if (option === 'copyColumn') {
    return `copy :${column} :${value} true`;
  } else if (option === 'customTransform') {
    return `set-column :${column} ${value}`;
  } else if (option === 'findAndReplace') {
    return `find-and-replace :${column} ${value}`;
  } else if (option === 'concatenate') {
    return `set-column :${column} ${value}`;
  } else if (option === 'delimited-text') {
    return `split-to-rows :${column} ${value}`;
  } else if (option === 'using-delimiters') {
    return `split-to-columns :${column} ${value}`;
  } else if (option === 'using-patterns') {
    return value;
  } else if (option === 'define-variable') {
    return value;
  } else if (option == 'send-to-error') {
    return value;
  } else if (option == 'set-counter') {
    return value;
  } else if (option == 'dateTime') {
    return `format-date :${column} ${value}`;
  } else if (option == 'dateTimeAsString') {
    return `format-datetime :${column} "${value}"`;
  } else if (option == 'fillNullOrEmpty') {
    return `fill-null-or-empty :${column} '${value}'`;
  } else if (CALCULATE_OPTIONS.some((item) => item.value === option)) {
    return value;
  } else if (option == 'custom-selection') {
    return value;
  } else if (option == 'using-positions') {
    return value;
  } else if (option == 'swap-columns') {
    return value;
  } else if (option == 'join-columns') {
    return value;
  } else if (option == 'replace-null-missing') {
    return `fill-null-or-empty :${column} '${value}'`;
  } else if (option === 'rename-column') {
    return `rename :${column} :${value}`;
  } else if (option === 'delete') {
    return value;
  } else if (option === 'keep') {
    return value;
  } else {
    null;
  }
};

const maskByShuffling = (column) => {
  return `mask-shuffle :${column}`;
};

const maskLast4Digits = (column) => {
  const pattern = maskLastNDigits(column, 4);
  return `mask-number :${column} ${pattern}`;
};
const maskLast2Digits = (column) => {
  const pattern = maskLastNDigits(column, 2);
  return `mask-number :${column} ${pattern}`;
};

const maskLastNDigits = (column, N) => {
  const { data } = DataPrepStore.getState().dataprep;
  const length = column.length;
  const maskPattern = Array.apply(null, { length: length - N })
    .map(() => 'x')
    .join('');
  const allowPattern = Array.apply(null, { length: N })
    .map(() => '#')
    .join('');

  const pattern = maskPattern + allowPattern;
  return pattern;
};

const explodeByFlattening = (columnName) => {
  let column = `:${columnName.toString()}`;
  if (Array.isArray(columnName) && columnName.length > 1) {
    column = columnName.map((c) => `:${c}`).join(',');
  }
  const directive = `flatten ${column}`;
  return directive;
};

const explodeRecordByFlattening = (columnName) => {
  let column = `:${columnName.toString()}`;
  if (Array.isArray(columnName) && columnName.length > 1) {
    column = columnName.map((c) => `:${c}`).join(',');
  }
  const directive = `flatten-record ${column}`;
  return directive;
};

export const getPattern = (textSelectionRange, rowNumber, columnSelected) => {
  const { start, end } = textSelectionRange;
  const getMaskPattern = (N) =>
    Array.apply(null, { length: N })
      .map(() => 'x')
      .join('');
  const getAllowPattern = (N) =>
    Array.apply(null, { length: N })
      .map(() => '#')
      .join('');
  const { data } = DataPrepStore.getState().dataprep;
  const length = data[rowNumber][columnSelected].length;
  if (start === 0) {
    return getMaskPattern(end) + getAllowPattern(length - end);
  }
  return getAllowPattern(start) + getMaskPattern(end - start) + getAllowPattern(length - end);
};
