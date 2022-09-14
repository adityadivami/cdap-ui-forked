import { DATATYPE_OPTIONS } from './components/NestedMenu/constants';
import DataPrepStore from 'components/DataPrep/store';
import e from 'express';

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
  } else {
    null;
  }
};

export const getDirectiveOnTwoInputs = (option, column, value) => {
  if (option === 'delimited-text') {
    return `split-to-rows :${column} ${value}`;
  } else if (option === 'using-patterns') {
    return `extract-regex-groups :${column} ${value}`;
  } else if (option === 'using-delimiters') {
    return `split-to-columns :${column} ${value}`;
  } else if (option === 'copy-column') {
    return `copy :${column} :${value} true`;
  } else if (option === 'findAndReplace') {
    return `find-and-replace :${column} ${value}`;
  } else if (option === 'concatenate') {
    return `set-column :${column} ${value}`;
  } else if (option === 'custom-transform') {
    return `set-column :${column} ${value}`;
  } else if (option === 'filter') {
    return value;
  } else {
    null;
  }
};

export const getDirectiveOnMultipleInputs = (option, column, value_1, value_2) => {
  if (option === 'hash') {
    return `hash :${column} ${value_1} ${value_2}`;
  } else {
    return null;
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
