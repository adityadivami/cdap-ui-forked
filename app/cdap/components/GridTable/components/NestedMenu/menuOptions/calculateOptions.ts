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

import { NATIVE_NUMBER_TYPES } from 'services/global-constants';
import T from 'i18n-react';

export const CALCULATE_OPTIONS = [
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.characterCount'
    ),
    value: 'CHARCOUNT',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['string'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.add'
    ),
    value: 'ADD',
    sign: '+',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.subtract'
    ),
    value: 'SUBTRACT',
    sign: '-',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.multiply'
    ),
    value: 'MULTIPLY',
    sign: 'x',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.divide'
    ),
    value: 'DIVIDE',
    sign: '/',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.modulo'
    ),
    value: 'MOD',
    sign: '%',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.powerOf'
    ),
    value: 'POWEROF',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.square'
    ),
    value: 'SQUARE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.squareRoot'
    ),
    value: 'SQUARE_ROOT',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.cube'
    ),
    value: 'CUBE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.cubeRoot'
    ),
    value: 'CUBE_ROOT',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.log'
    ),
    value: 'LOG',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.naturalLog'
    ),
    value: 'NATURALLOG',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.absoluteValue'
    ),
    value: 'ABSVALUE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.ceil'
    ),
    value: 'CEIL',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.floor'
    ),
    value: 'FLOOR',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.sin'
    ),
    value: 'SIN',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.cos'
    ),
    value: 'COS',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.tan'
    ),
    value: 'TAN',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.ARCSIN'
    ),
    value: 'ARCSIN',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.ARCCOS'
    ),
    value: 'ARCCOS',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.ARCTAN'
    ),
    value: 'ARCTAN',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.round'
    ),
    value: 'ROUND',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.random'
    ),
    value: 'RANDOM',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalSubtract'
    ),
    value: 'DECIMALADD',
    sign: '+',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalSubtract'
    ),
    value: 'DECIMALSUBTRACT',
    sign: '-',
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalMultiply'
    ),
    value: 'DECIMALMULTIPLY',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalDivide'
    ),
    value: 'DECIMALDIVIDEQ',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalDivider'
    ),
    value: 'DECIMALDIVIDER',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.drecision'
    ),
    value: 'PRECISION',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.scale'
    ),
    value: 'SCALE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.unscaled'
    ),
    value: 'UNSCALED',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalLeft'
    ),
    value: 'DECIMALLEFT',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalRight'
    ),
    value: 'DECIMALRIGHT',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalPowerOf'
    ),
    value: 'DECIMALPOWEROF',
    sign: null,
    inputRequired: true,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalAbsoluteValue'
    ),
    value: 'DECIMALABSVALUE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalSquare'
    ),
    value: 'DECIMALSQUARE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.decimalCube'
    ),
    value: 'DECIMALCUBE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.negate'
    ),
    value: 'NEGATE',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.StripZero'
    ),
    value: 'STRIPZERO',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.Sign'
    ),
    value: 'SIGN',
    sign: null,
    inputRequired: false,
    component: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.calculate.component'
    ),
    supported_dataType: ['bigdecimal'],
  },
];
