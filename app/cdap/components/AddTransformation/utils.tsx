/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
        directive = `parse-as-csv :${column} ' ' ${booleanValue}`;
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

export const prepareDirectiveForPattern = (
  column,
  patternName,
  startValue,
  endValue,
  nDigit,
  customInput
) => {
  let directive;
  switch (patternName) {
    case 'creditcard':
      directive = `extract-regex-groups :${column} ((?:\\d{4}[-\\s]?){4})`;
      break;
    case 'date':
      directive = `extract-regex-groups :${column} ((?:(?:\\d{4}|\\d{2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))|(?:(?:(?:\\d{1,2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))|(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{4}|\\d{2})))`;
      break;
    case 'datetime':
      directive = `extract-regex-groups :${column} ((?:(?:(?:\\d{4}|\\d{2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))|(?:(?:(?:\\d{1,2})(?:(?:[.,]\\s)|[-\/.\\s])(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))|(?:(?:1[0-2])|(?:0?\\d)|(?:[a-zA-Z]{3}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{1,2}))(?:(?:[.,]\\s)|[-\/.\\s])(?:\\d{4}|\\d{2})))[T\\s](?:(?:(?:2[0-3])|(?:[01]?\\d))[h:\\s][0-5]\\d(?::(?:(?:[0-5]\\d)|(?:60)))?(?:\\s[aApP][mM])?(?:Z|(?:[+-](?:1[0-2])|(?:0?\\d):[0-5]\\d)|(?:\\s[[a-zA-Z]\\s]+))?))`;
      break;
    case 'email':
      directive = `extract-regex-groups :${column} ([a-zA-Z0-9!#$%&*+/=?^_\`'{|}~-]+@(?!.*\\.{2})[a-zA-Z0-9\\.-]+(?:\\.[a-zA-Z]{2,6})?)`;
      break;
    case 'htmlhyperlink':
      directive = `extract-regex-groups :${column} <[aA](?:\\s+[a-zA-Z]+=".*?")*\\s+[hH][rR][eE][fF]="(.*?)"(?:\\s+[a-zA-Z]+=".*?")*>(?:.*)<\/[aA]>`;
      break;
    case 'ipv4':
      directive = `extract-regex-groups :${column} ((?:(?:0|(?:25[0-5])|(?:2[0-4][1-9])|(?:1\\d\\d)|(?:[1-9]\\d?))\\.){3}(?:(?:0|(?:25[0-5])|(?:2[0-4][1-9])|(?:1\\d\\d)|(?:[1-9]\\d?))))`;
      break;
    case 'isbncodes':
      directive = `extract-regex-groups :${column} ((?:97[89]-?)?(?:\\d-?){9}[\\dxX])`;
      break;
    case 'macaddress':
      directive = `extract-regex-groups :${column} ((?:\\p{XDigit}{2}[:-]){5}(?:\\p{XDigit}{2}))`;
      break;
    case 'ndigitnumber':
      directive = `extract-regex-groups :${column} (\\d{${nDigit}})`;
      break;
    case 'phonenumber':
      directive = `extract-regex-groups :${column} ((?:\\+\\d{1,3}[\\s-]?)?\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4})`;
      break;
    case 'ssn':
      directive = `extract-regex-groups :${column} (\\d{3}[-\\s]?\\d{2}[-\\s]?\\d{4})`;
      break;
    case 'startend':
      directive = `extract-regex-groups :${column} .*${startValue}(.*)${endValue}.*`;
      break;
    case 'time':
      directive = `extract-regex-groups :${column} ((?:(?:2[0-3])|(?:[01]?\\d))[h:\\s][0-5]\\d(?::(?:(?:[0-5]\\d)|(?:60)))?(?:\\s[aApP][mM])?(?:Z|(?:[+-](?:1[0-2])|(?:0?\\d):[0-5]\\d)|(?:\\s[[a-zA-Z]\\s]+))?)`;
      break;
    case 'upscodes':
      directive = `extract-regex-groups :${column} (1Z\\s?[0-9a-zA-Z]{3}\\s?[0-9a-zA-Z]{3}\\s?[0-9a-zA-Z]{2}\\s?\\d{4}\\s?\\d{4})`;
      break;
    case 'url':
      directive = `extract-regex-groups :${column} ((?:(?:http[s]?|ftp):\/)?\/?(?:[^\/\\s]+)(?:(?:\/\\w+)*\/)(?:[\\w\-\.]+[^#?\\s]+)(?:.*)?)`;
      break;
    case 'zipcode':
      directive = `extract-regex-groups :${column} [^\\d]?([0-9]{5}(?:-[0-9]{4})?)[^\\d]?`;
      break;
    case 'custom':
      directive = `extract-regex-groups :${column} ${customInput}`;
      break;
  }
  return directive;
};

export const prepareDirectiveForDefineVariable = (
  variableValue,
  customInput,
  selectedColumnForDefineVariable,
  selectedAction,
  columnSelected
) => {
  const condition = 'set-variable';
  const column = columnSelected;
  const textValue = customInput;
  const variableName = variableValue;
  const selectedColumn = selectedColumnForDefineVariable;
  let directive;
  const selectedCondition = selectedAction;
  if (!textValue || !variableName) {
    return;
  }

  switch (selectedCondition) {
    case 'TEXTSTARTSWITH':
      directive = `${condition} ${variableName} ${column} =^ "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTENDSWITH':
      directive = `${condition} ${variableName} ${column} =$ "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTEXACTLY':
      directive = `${condition} ${variableName} ${column} == "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTREGEX':
      directive = `${condition} ${variableName} ${column} =~ ${textValue} ? ${selectedColumn} : ${variableName}`;
      break;
    case 'CUSTOMCONDITION':
      directive = `${condition} ${variableName} ${textValue} ? ${selectedColumn} : ${variableName}`;
      break;
  }
  return directive;
};

const conditionToFnMap = {
  ISNUMBER: 'isNumber',
  ISINTEGER: 'isInteger',
  ISDOUBLE: 'isDouble',
  ISBOOLEAN: 'isBoolean',
  ISDATE: 'isDate',
  ISTIME: 'isTime',
  ISDATEFORMAT: 'isDate',
  ISIP: 'isIP',
  ISIPV4: 'isIPv4',
  ISIPV6: 'isIPv6',
  ISEMAIL: 'isEmail',
  ISURL: 'isUrl',
  ISDOMAINNAME: 'isDomainName',
  ISDOMAINTLD: 'isDomainTld',
  ISGENERICTLD: 'isGenericTld',
  ISCOUNTRYTLD: 'isCountryTld',
  ISISBN: 'isISBN',
  ISISBN10: 'isISBN10',
  ISISBN13: 'isISBN13',
  ISCREDITCARD: 'isCreditCard',
  ISAMEXCARD: 'isAmex',
  ISVISACARD: 'isVisa',
  ISMASTERCARD: 'isMaster',
  ISDINERCARD: 'isDiner',
  ISVPAYCARD: 'isVPay',
};

const getDQFunction = (condition) => {
  const c = condition.replace('NOT', '');
  return conditionToFnMap[c];
};

const dqFunctions = Object.keys(conditionToFnMap).reduce((prev, curr) => {
  const condition = curr.replace(/IS|ISNOT/, '');
  return [...prev, `IS${condition}`, `ISNOT${condition}`];
}, []);

export const prepareDirectiveForSendToError = (
  selectedColumn,
  textValue,
  ignoreCase,
  filterAction
) => {
  const directive = 'send-to-error';
  const column = selectedColumn;
  let equalityOperator = '==';
  let finalExpression;
  let condition;

  switch (filterAction) {
    case 'EMPTY':
      finalExpression = `${directive} empty(${column})`;
      break;

    case 'TEXTCONTAINS':
      if (textValue === '') {
        // if we get no textValue
        return '';
      }

      if (ignoreCase) {
        textValue = `(?i).*${textValue}`;
      } else {
        textValue = `.*${textValue}`;
      }
      finalExpression = `${directive} ${column} =~ "${textValue}.*"`;
      break;

    case 'TEXTSTARTSWITH':
      if (textValue === '') {
        return '';
      }
      equalityOperator = '=^';
      if (ignoreCase) {
        textValue = `(?i)^${textValue}.*`;
        equalityOperator = '=~';
      }
      finalExpression = `${directive} ${column} ${equalityOperator} "${textValue}"`;
      break;

    case 'TEXTENDSWITH':
      if (textValue === '') {
        return '';
      }
      equalityOperator = '=$';
      if (ignoreCase) {
        textValue = `(?i).*${textValue}$`;
        equalityOperator = '=~';
      }
      finalExpression = `${directive} ${column} ${equalityOperator} "${textValue}"`;
      break;
    case 'TEXTEXACTLY':
      if (textValue === '') {
        return '';
      }
      if (ignoreCase) {
        textValue = `(?i)${textValue}`;
        equalityOperator = `=~`;
      }
      finalExpression = `${directive} ${column} ${equalityOperator} "${textValue}"`;
      break;
    case 'TEXTREGEX':
      if (textValue === '') {
        return '';
      }
      finalExpression = `${directive} ${column} =~ "${textValue}"`;
      break;

    case 'CUSTOMCONDITION':
      if (textValue === '') {
        return '';
      }
      finalExpression = `${directive} ${textValue}`;
      break;
    case 'ISDATEFORMAT':
    case 'ISNOTDATEFORMAT':
      condition = `dq:${getDQFunction(filterAction)}(${column})`;
      if (filterAction.indexOf('NOT') !== -1) {
        condition = `!${condition}`;
      }
      finalExpression = `${directive} ${condition}`;
      break;
    default:
      if (dqFunctions.indexOf(filterAction) !== -1) {
        condition = `dq:${getDQFunction(filterAction)}(${column})`;
        if (filterAction.indexOf('NOT') !== -1) {
          condition = `!${condition}`;
        }
        finalExpression = `${directive} ${condition}`;
      }
      break;
  }

  return finalExpression;
};

export const prepareDirectiveForCalculate = (
  functionName,
  selectedColumn,
  copyToNew,
  newColumnName,
  inputDigit
) => {
  let directive;
  switch (functionName) {
    case 'ADD':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} + ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} + ${inputDigit}`;
      break;
    case 'SUBTRACT':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} - ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} - ${inputDigit}`;
      break;
    case 'MULTIPLY':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} * ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} * ${inputDigit}`;
      break;
    case 'DIVIDE':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} / ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} / ${inputDigit}`;
      break;
    case 'MOD':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} % ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} % ${inputDigit}`;
      break;
    case 'POWEROF':
      directive = copyToNew
        ? `set-column :${newColumnName} math:pow(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} math:pow(${selectedColumn}, ${inputDigit})`;
      break;
    case 'SQUARE':
      directive = copyToNew
        ? `set-column :${newColumnName} math:pow(${selectedColumn}, 2)`
        : `set-column :${selectedColumn} math:pow(${selectedColumn}, 2)`;
      break;
    case 'SQUARE_ROOT':
      directive = copyToNew
        ? `set-column :${newColumnName} math:sqrt(${selectedColumn})`
        : `set-column :${selectedColumn} math:sqrt(${selectedColumn})`;
      break;
    case 'CUBE':
      directive = copyToNew
        ? `set-column :${newColumnName} math:pow(${selectedColumn}, 3)`
        : `set-column :${selectedColumn} math:pow(${selectedColumn}, 3)`;
      break;
    case 'CUBE_ROOT':
      directive = copyToNew
        ? `set-column :${newColumnName} math:cbrt(${selectedColumn})`
        : `set-column :${selectedColumn} math:cbrt(${selectedColumn})`;
      break;
    case 'DECIMALADD':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:add(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:add(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALSUBTRACT':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:subtract(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:subtract(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALMULTIPLY':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:multiply(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:multiply(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALDIVIDEQ':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:divideq(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:divideq(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALDIVIDER':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:divider(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:divider(${selectedColumn}, ${inputDigit})`;
      break;
    case 'LOG':
      directive = copyToNew
        ? `set-column :${newColumnName} math:log10(${selectedColumn})`
        : `set-column :${selectedColumn} math:log10(${selectedColumn})`;
      break;
    case 'NATURALLOG':
      directive = copyToNew
        ? `set-column :${newColumnName} math:log(${selectedColumn})`
        : `set-column :${selectedColumn} math:log(${selectedColumn})`;
      break;
    case 'ABSVALUE':
      directive = copyToNew
        ? `set-column :${newColumnName} math:abs(${selectedColumn})`
        : `set-column :${selectedColumn} math:abs(${selectedColumn})`;
      break;
    case 'CEIL':
      directive = copyToNew
        ? `set-column :${newColumnName} math:ceil(${selectedColumn})`
        : `set-column :${selectedColumn} math:ceil(${selectedColumn})`;
      break;
    case 'FLOOR':
      directive = copyToNew
        ? `set-column :${newColumnName} math:floor(${selectedColumn})`
        : `set-column :${selectedColumn} math:floor(${selectedColumn})`;
      break;
    case 'SIN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:sin(${selectedColumn})`
        : `set-column :${selectedColumn} math:sin(${selectedColumn})`;
      break;
    case 'COS':
      directive = copyToNew
        ? `set-column :${newColumnName} math:cos(${selectedColumn})`
        : `set-column :${selectedColumn} math:cos(${selectedColumn})`;
      break;
    case 'TAN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:tan(${selectedColumn})`
        : `set-column :${selectedColumn} math:tan(${selectedColumn})`;
      break;

    case 'ARCSIN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:asin(${selectedColumn})`
        : `set-column :${selectedColumn} math:asin(${selectedColumn})`;
      break;
    case 'ARCCOS':
      directive = copyToNew
        ? `set-column :${newColumnName} math:acos(${selectedColumn})`
        : `set-column :${selectedColumn} math:acos(${selectedColumn})`;
      break;
    case 'ARCTAN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:atan(${selectedColumn})`
        : `set-column :${selectedColumn} math:atan(${selectedColumn})`;
      break;

    case 'ROUND':
      directive = copyToNew
        ? `set-column :${newColumnName} math:round(${selectedColumn})`
        : `set-column :${selectedColumn} math:round(${selectedColumn})`;
      break;
    case 'RANDOM':
      directive = copyToNew
        ? `set-column :${newColumnName} math:random()`
        : `set-column :${selectedColumn} math:random()`;
      break;

    case 'CHARCOUNT':
      directive = `set-column :${newColumnName} string:length(${selectedColumn})`;
      break;

    case 'PRECISION':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:precision(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:precision(${selectedColumn})`;
      break;
    case 'SCALE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:scale(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:scale(${selectedColumn})`;
      break;
    case 'UNSCALED':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:unscaled(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:unscaled(${selectedColumn})`;
      break;
    case 'DECIMALLEFT':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:decimal_left(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:decimal_left(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALRIGHT':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:decimal_right(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:decimal_right(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALPOWEROF':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:pow(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:pow(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALABSVALUE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:abs(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:abs(${selectedColumn})`;
      break;
    case 'DECIMALSQUARE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:pow(${selectedColumn}, 2)`
        : `set-column :${selectedColumn} decimal:pow(${selectedColumn}, 2)`;
      break;
    case 'DECIMALCUBE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:pow(${selectedColumn}, 3)`
        : `set-column :${selectedColumn} decimal:pow(${selectedColumn}, 3)`;
      break;
    case 'NEGATE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:negate(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:negate(${selectedColumn})`;
      break;
    case 'STRIPZERO':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:strip_zero(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:strip_zero(${selectedColumn})`;
      break;
    case 'SIGN':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:sign(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:sign(${selectedColumn})`;
      break;
  }
  return directive;
};

export const prepareDirectiveForMerge = (
  radioOption,
  column_1,
  column_2,
  newColumnName,
  customInput
) => {
  let directive;
  if (radioOption === 'custom') {
    directive = `merge :${column_1} :${column_2} :${newColumnName} ${customInput}`;
  } else {
    directive = `merge :${column_1} :${column_2} :${newColumnName} ${radioOption}`;
  }
  return directive;
};

export const prepareDirectiveForMultipleDelete = (columnList) => {
  let initial_value = 'drop :';
  columnList.forEach((item, index) => {
    if (index > 0) {
      initial_value += `,:${item.label}`;
    } else {
      initial_value += `${item.label}`;
    }
  });
  return initial_value;
};

export const prepareDirectiveForMultipleKeep = (columnList) => {
  let initial_value = 'keep :';
  columnList.forEach((item, index) => {
    if (index > 0) {
      initial_value += `,:${item.label}`;
    } else {
      initial_value += `${item.label}`;
    }
  });
  return initial_value;
};
