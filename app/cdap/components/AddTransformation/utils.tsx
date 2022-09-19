export const parseDirective = (
  functionName,
  column,
  radioOption,
  inputValue,
  booleanValue,
  columnWidth?,
  optionPadding?
) => {
  let directive;
  if (functionName === 'parseCSV') {
    switch (radioOption) {
      case 'comma':
        directive = `parse-as-csv :${column} ',' ${booleanValue}`;
        break;
      case 'tab':
        directive = `parse-as-csv :${column} '\\t' ${booleanValue}`;
        break;
      case 'space':
        directive = `parse-as-csv :${column} '' ${booleanValue}`;
        break;
      case 'pipe':
        directive = `parse-as-csv :${column} '\\|' ${booleanValue}`;
        break;
      case 'capA':
        directive = `parse-as-csv :${column} '\\u0001' ${booleanValue}`;
        break;
      case 'capD':
        directive = `parse-as-csv :${column} '\\u0004' ${booleanValue}`;
        break;
      case 'customDelimiter':
        directive = `parse-as-csv :${column} '${inputValue}' ${booleanValue}`;
        break;
    }
    return directive;
  } else if (functionName === 'parseExcel') {
    return `parse-as-excel :${column} '${inputValue}' ${booleanValue}`;
  } else if (functionName === 'parseJSON') {
    return `parse-as-json :${column} ${inputValue}`;
  } else if (functionName === 'parseXML') {
    return `parse-xml-to-json :${column} ${inputValue}`;
  } else if (functionName === 'parseLog') {
    if (radioOption === 'custom') {
      return `parse-as-log :${column} '${inputValue}'`;
    } else {
      return `parse-as-log :${column} '${radioOption}'`;
    }
  } else if (functionName === 'parseSimpleDate') {
    if (radioOption === 'customFormat') {
      return `parse-as-simple-date  :${column} ${inputValue}`;
    } else {
      return `parse-as-simple-date  :${column} ${radioOption}`;
    }
  } else if (functionName === 'parseDateTime') {
    if (radioOption === 'customFormat') {
      return `parse-as-datetime  :${column} \"${inputValue}\"`;
    } else {
      return `parse-as-datetime  :${column} \"${radioOption}\"`;
    }
  } else if (functionName === 'parseFixedLength') {
    return `parse-as-fixed-length :${column} ${columnWidth} ${optionPadding}`;
  }
};

export const directiveForHash = (column, alogorithm, encode) => {
  return `hash :${column} ${alogorithm} ${encode}`;
};

const FILTER_DIRECTIVES_MAP = {
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

export const prepareDirectiveForFilter = (
  rowFilter,
  selectedCondition,
  selectedConditionValue,
  ignoreCase,
  columnName
) => {
  let directive = '';
  let column = columnName;
  let textValue = selectedConditionValue;
  let configuration;
  const condition = FILTER_DIRECTIVES_MAP[rowFilter][selectedCondition];
  switch (selectedCondition) {
    case 'EMPTY':
      directive = `${condition} ${column} == null || ${column} =~ "^\\W*$"`;
      break;
    case 'TEXTCONTAINS':
      if (ignoreCase) {
        textValue = `(?i)${textValue}`;
      }
      directive = `${condition} ${column} .*${textValue}.*`;
      break;
    case 'TEXTSTARTSWITH':
      configuration = `"${textValue}"`;
      if (ignoreCase) {
        column = `${column}.toLowerCase()`;
        configuration = `"${textValue}".toLowerCase()`;
      }
      directive = `${condition} ${column} =^ ${configuration}`;
      break;
    case 'TEXTENDSWITH':
      configuration = `"${textValue}"`;
      if (ignoreCase) {
        column = `${column}.toLowerCase()`;
        configuration = `"${textValue}".toLowerCase()`;
      }
      directive = `${condition} ${column} =$ ${configuration}`;
      break;
    case 'TEXTEXACTLY':
      if (ignoreCase) {
        textValue = `(?i)${textValue}`;
      }
      directive = `${condition} ${column} ^${textValue}$`;
      break;
    case 'TEXTREGEX':
      directive = `${condition} ${column} ${textValue}`;
      break;
    case 'CUSTOMCONDITION':
      directive = `${condition} ${column} ${textValue}`;
      break;
  }
  return directive;
};
