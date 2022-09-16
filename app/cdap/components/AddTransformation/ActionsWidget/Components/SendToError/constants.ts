/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

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
