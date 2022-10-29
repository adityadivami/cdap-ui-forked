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

import T from 'i18n-react';

const directive = 'send-to-error';

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

const otherOptionsDirective = (column: string, filterAction: string) => {
  if (dqFunctions.indexOf(filterAction) !== -1) {
    let condition = `dq:${getDQFunction(filterAction)}(${column})`;
    if (filterAction.indexOf('NOT') !== -1) {
      condition = `!${condition}`;
    }
    return `${directive} ${condition}`;
  }
};

export const SEND_TO_ERROR_PLACEHOLDER = {
  EMPTY: '',
  TEXTEXACTLY: `${T.translate(
    'features.DirectiveUIComponent.sendToError.optionPlaceHolder.textExactly'
  )}`,
  TEXTCONTAINS: `${T.translate(
    'features.DirectiveUIComponent.sendToError.optionPlaceHolder.textContains'
  )}`,
  TEXTSTARTSWITH: `${T.translate(
    'features.DirectiveUIComponent.sendToError.optionPlaceHolder.textStartWith'
  )}`,
  TEXTENDSWITH: `${T.translate(
    'features.DirectiveUIComponent.sendToError.optionPlaceHolder.textEndWith'
  )}`,
  TEXTREGEX: `${T.translate(
    'features.DirectiveUIComponent.sendToError.optionPlaceHolder.textRegex'
  )}`,
  CUSTOMCONDITION: `${T.translate(
    'features.DirectiveUIComponent.sendToError.optionPlaceHolder.customCondition'
  )}`,
};

export const SEND_TO_ERROR_OPTIONS = [
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.emptyValue')}`,
    value: 'EMPTY',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => `${directive} empty(${column})`,
  },

  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.textExactly')}`,
    value: 'TEXTEXACTLY',
    isInputRequired: true,
    isCheckboxRequired: true,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => {
      let equalityOperator = '==';
      let textValue = inputValue;
      if (ignoreCase) {
        textValue = `(?i)${inputValue}`;
        equalityOperator = `=~`;
      }
      return `${directive} ${column} ${equalityOperator} "${textValue}"`;
    },
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.textContains')}`,
    value: 'TEXTCONTAINS',
    isInputRequired: true,
    isCheckboxRequired: true,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => {
      let textValue = inputValue;
      if (ignoreCase) {
        textValue = `(?i).*${textValue}`;
      } else {
        textValue = `.*${textValue}`;
      }
      return `${directive} ${column} =~ "${textValue}.*"`;
    },
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.textStartWith')}`,
    value: 'TEXTSTARTSWITH',
    isInputRequired: true,
    isCheckboxRequired: true,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => {
      let equalityOperator = '=^';
      let textValue = inputValue;
      if (ignoreCase) {
        textValue = `(?i)^${textValue}.*`;
        equalityOperator = '=~';
      }
      return `${directive} ${column} ${equalityOperator} "${textValue}"`;
    },
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.textEndWith')}`,
    value: 'TEXTENDSWITH',
    isInputRequired: true,
    isCheckboxRequired: true,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => {
      let equalityOperator = '=$';
      let textValue = inputValue;
      if (ignoreCase) {
        textValue = `(?i).*${textValue}$`;
        equalityOperator = '=~';
      }
      return `${directive} ${column} ${equalityOperator} "${textValue}"`;
    },
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.textRegex')}`,
    value: 'TEXTREGEX',
    isInputRequired: true,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => `${directive} ${column} =~ "${inputValue}"`,
  },

  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNumber')}`,
    value: 'ISNUMBER',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotNumber')}`,
    value: 'ISNOTNUMBER',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isDouble')}`,
    value: 'ISDOUBLE',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotDouble')}`,
    value: 'ISNOTDOUBLE',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isInteger')}`,
    value: 'ISINTEGER',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotInteger')}`,
    value: 'ISNOTINTEGER',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isBoolean')}`,
    value: 'ISBOOLEAN',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotBoolean')}`,
    value: 'ISNOTBOOLEAN',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isDate')}`,
    value: 'ISDATE',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotDate')}`,
    value: 'ISNOTDATE',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isDateFormat')}`,
    value: 'ISDATEFORMAT',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => {
      let condition = `dq:${getDQFunction(filterAction)}(${column})`;
      if (filterAction.indexOf('NOT') !== -1) {
        condition = `!${condition}`;
      }
      return `${directive} ${condition}`;
    },
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotDateFormat'
    )}`,
    value: 'ISNOTDATEFORMAT',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => {
      let condition = `dq:${getDQFunction(filterAction)}(${column})`;
      if (filterAction.indexOf('NOT') !== -1) {
        condition = `!${condition}`;
      }
      return `${directive} ${condition}`;
    },
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isTime')}`,
    value: 'ISTIME',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotTime')}`,
    value: 'ISNOTTIME',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isIP')}`,
    value: 'ISIP',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotIP')}`,
    value: 'ISNOTIP',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isIPV4')}`,
    value: 'ISIPV4',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotIPV4')}`,
    value: 'ISNOTIPV4',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isIPV6')}`,
    value: 'ISIPV6',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotIPV6')}`,
    value: 'ISNOTIPV6',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isEmail')}`,
    value: 'ISEMAIL',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotEmail')}`,
    value: 'ISNOTEMAIL',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isURL')}`,
    value: 'ISURL',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotURL')}`,
    value: 'ISNOTURL',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isDomain')}`,
    value: 'ISDOMAINNAME',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotDomain')}`,
    value: 'ISNOTDOMAINNAME',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isDomainTLD')}`,
    value: 'ISDOMAINTLD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotDomainTLD'
    )}`,
    value: 'ISNOTDOMAINTLD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isGenericTLD')}`,
    value: 'ISGENERICTLD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotGenericTLD'
    )}`,
    value: 'ISNOTGENERICTLD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isCountryTLD')}`,
    value: 'ISCOUNTRYTLD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotCountryTLD'
    )}`,
    value: 'ISNOTCOUNTRYTLD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isValueISBN')}`,
    value: 'ISISBN',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isValueNotISBN'
    )}`,
    value: 'ISNOTISBN',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isValueISBN10')}`,
    value: 'ISISBN10',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isValueNotISBN10'
    )}`,
    value: 'ISNOTISBN10',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isValueISBN13')}`,
    value: 'ISISBN13',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isValueNotISBN13'
    )}`,
    value: 'ISNOTISBN13',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isCreditCard')}`,
    value: 'ISCREDITCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotCreditCard'
    )}`,
    value: 'ISNOTCREDITCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isAmericanExpressCard'
    )}`,
    value: 'ISAMEXCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotAmericanExpressCard'
    )}`,
    value: 'ISNOTAMEXCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isVisaCard')}`,
    value: 'ISVISACARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotVisaCard')}`,
    value: 'ISNOTVISACARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isMasterCard')}`,
    value: 'ISMASTERCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotMasterCard'
    )}`,
    value: 'ISNOTMASTERCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isDinerCard')}`,
    value: 'ISDINERCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.isNotDinerCard'
    )}`,
    value: 'ISNOTDINERCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isVPayCard')}`,
    value: 'ISVPAYCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate('features.DirectiveUIComponent.sendToError.optionLabels.isNotVPayCard')}`,
    value: 'ISNOTVPAYCARD',
    isInputRequired: false,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => otherOptionsDirective(column, filterAction),
  },
  {
    label: `${T.translate(
      'features.DirectiveUIComponent.sendToError.optionLabels.customCondition'
    )}`,
    value: 'CUSTOMCONDITION',
    isInputRequired: true,
    isCheckboxRequired: false,
    directive: (
      directive: string,
      column: string,
      ignoreCase: boolean,
      inputValue: string,
      filterAction?: string
    ) => `${directive} ${inputValue}`,
  },
];
