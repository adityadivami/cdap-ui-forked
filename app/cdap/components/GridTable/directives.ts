import { DATATYPE_OPTIONS } from './components/NestedMenu/constants';
import DataPrepStore from 'components/DataPrep/store';

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
  } else if (option === 'copyColumn') {
    return `copy :${column} :${value} true`;
  } else if (option === 'customTransform') {
    return `set-column :${column} ${value}`;
  } else if (option === 'findAndReplace') {
    return `find-and-replace :${column} ${value}`;
  } else if (option === 'concatenate') {
    return `set-column :${column} ${value}`;
  } else {
    null;
  }
};
