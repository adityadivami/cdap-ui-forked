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

import { render, screen } from '@testing-library/react';
import React from 'react';
import SelectColumnsList from 'components/ColumnView/SelectColumnsList';
import T from 'i18n-react';

const mockColumnData = [
  {
    name: 'body_0',
    label: 'body_0',
    type: ['Int'],
  },
  {
    name: 'body_1',
    label: 'body_1',
    type: ['String'],
  },
  {
    name: 'body_2',
    label: 'body_2',
    type: ['String'],
  },
  {
    name: 'body_3',
    label: 'body_3',
    type: ['String'],
  },
];

const mockDataQuality = {
  body_0: {
    general: {
      'non-null': 100,
    },
  },
  body_1: {
    general: {
      'non-null': 66.66667,
      null: 33.333336,
    },
  },
  body_2: {
    general: {
      'non-null': 83.33333,
      null: 16.666668,
    },
    types: {
      Integer: 33.333336,
      Text: 33.333336,
    },
  },
  body_3: {
    general: {
      'non-null': 50,
      null: 50,
    },
    types: {
      Text: 16.666668,
    },
  },
};
describe('It should test SelectColumnList Component', () => {
  it('should render SelectColumnList Component and test column header text for null values', () => {
    render(
      <SelectColumnsList
        columnData={mockColumnData}
        dataQuality={mockDataQuality}
        searchTerm={'mockSearchItem'}
      />
    );
    const nullValueHeader = screen.getByTestId('null-values-header');
    expect(nullValueHeader).toHaveTextContent(
      T.translate(`features.NewWranglerUI.nullValues`).toString()
    );
  });
  it('should render SelectColumnList Component and test ', () => {
    render(
      <SelectColumnsList
        columnData={mockColumnData}
        dataQuality={mockDataQuality}
        searchTerm={'body_0'}
      />
    );
    const columnNameHeader = screen.getByTestId('column-name-header');
    expect(columnNameHeader).toHaveTextContent(
      T.translate(`features.NewWranglerUI.columns (4)`).toString()
    );
  });
  it('should render SelectColumnList Component and test Column Name and datatype ', () => {
    render(
      <SelectColumnsList
        columnData={mockColumnData}
        dataQuality={mockDataQuality}
        searchTerm={''}
      />
    );

    const columnLabelType = screen.getByTestId('each-column-label-type-1');
    expect(columnLabelType).toHaveTextContent('body_1 String');
  });
});
