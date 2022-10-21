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

import { NATIVE_NUMBER_TYPES, NUMBER_TYPES } from 'services/global-constants';
import T from 'i18n-react';

export const MATH_OPTIONS = [
  {
    value: 'algebra',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.math.algebra'
    ),
    options: [
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.add'
        ),
        value: 'ADD',
        sign: '+',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.subtract'
        ),
        value: 'SUBTRACT',
        sign: '-',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.multiply'
        ),
        value: 'MULTIPLY',
        sign: 'x',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.divide'
        ),
        value: 'DIVIDE',
        sign: '/',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.modulo'
        ),
        value: 'MOD',
        sign: '%',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.powerOf'
        ),
        value: 'POWEROF',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.square'
        ),
        value: 'SQUARE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.squareRoot'
        ),
        value: 'SQUARE_ROOT',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.cube'
        ),
        value: 'CUBE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.cubeRoot'
        ),
        value: 'CUBE_ROOT',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.log'
        ),
        value: 'LOG',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.naturalLog'
        ),
        value: 'NATURALLOG',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.absoluteValue'
        ),
        value: 'ABSVALUE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.ceil'
        ),
        value: 'CEIL',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.floor'
        ),
        value: 'FLOOR',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
  {
    value: 'trigonometry',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.math.trigonometry'
    ),
    options: [
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.sin'
        ),
        value: 'SIN',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.cos'
        ),
        value: 'COS',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.tan'
        ),
        value: 'TAN',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.arcsin'
        ),
        value: 'ARCSIN',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.arccos'
        ),
        value: 'ARCCOS',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.arctan'
        ),
        value: 'ARCTAN',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
  {
    value: 'random',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.math.random'
    ),
    options: [
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.random'
        ),
        value: 'RANDOM',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
  {
    value: 'decimal',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimal'
    ),
    options: [
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalAdd'
        ),
        value: 'DECIMALADD',
        sign: '+',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalSubtract'
        ),
        value: 'DECIMALSUBTRACT',
        sign: '-',
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalMultiply'
        ),
        value: 'DECIMALMULTIPLY',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalDivide'
        ),
        value: 'DECIMALDIVIDEQ',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalDivider'
        ),
        value: 'DECIMALDIVIDER',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.precision'
        ),
        value: 'PRECISION',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.scale'
        ),
        value: 'SCALE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.unscaled'
        ),
        value: 'UNSCALED',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalLeft'
        ),
        value: 'DECIMALLEFT',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalRight'
        ),
        value: 'DECIMALRIGHT',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalPowerOf'
        ),
        value: 'DECIMALPOWEROF',
        sign: null,
        inputRequired: true,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalAbsoluteValue'
        ),
        value: 'DECIMALABSVALUE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalSquare'
        ),
        value: 'DECIMALSQUARE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.decimalCube'
        ),
        value: 'DECIMALCUBE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.negate'
        ),
        value: 'NEGATE',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.stripZero'
        ),
        value: 'STRIPZERO',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
      {
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.math.sign'
        ),
        value: 'SIGN',
        sign: null,
        inputRequired: false,
        component: 'Calculate',
        supported_dataType: ['bigdecimal'],
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
];
