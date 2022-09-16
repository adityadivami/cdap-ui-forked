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

import { DIRECTIVES_MAP } from './ActionsWidget/Components/FilterAction/constants';

export const prepareDirectiveForFilter = (
  rowFilter,
  selectedCondition,
  newColumnName,
  ignoreCase,
  columnName
) => {
  let directive = '';
  let column = columnName;
  let textValue = newColumnName;
  let configuration;
  const condition = DIRECTIVES_MAP[rowFilter][selectedCondition];
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
    // case 'CUSTOMCONDITION':
    //   directive = `${condition} ${column} ${this.state.customFilter}`;
    //   break;
  }
  return directive;
};

export const prepareDirectiveForDefineVariable = (
  variableValue,
  textFilter,
  selectedColumnValue,
  selectedAction
) => {
  const condition = 'set-variable';
  const column = selectedColumnValue;
  const textValue = textFilter;
  const variableName = variableValue;
  const selectedColumn = selectedColumnValue;
  let directive;
  const selectedCondition = selectedAction;
  if (!textValue || !variableName) {
    return;
  }

  switch (selectedCondition) {
    case 'TEXTCONTAINS':
      directive = `${condition} ${variableName} ${column} =~ .*${textValue}.* ? ${selectedColumn} : ${variableName}`;
      break;
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
