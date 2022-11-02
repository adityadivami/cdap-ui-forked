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
import {
  mockDataQualityValue,
  mockDataQualityValueForTableRow,
} from 'components/AddTransformation/mock/mockDataForAddTransformation';

import React from 'react';
import TableRow from 'components/AddTransformation/ColumnTable/Components/TableRow';

describe('It Should test TableRow Component', () => {
  it('Should test TableRow Component', () => {
    const container = render(
      <TableRow
        onSingleSelection={jest.fn()}
        selectedColumns={[
          {
            label: 'body_5',
            name: 'body_5',
            type: ['String'],
          },
        ]}
        dataQualityValue={mockDataQualityValueForTableRow}
        isSingleSelection={false}
        handleDisableCheckbox={jest.fn()}
        onMultipleSelection={jest.fn()}
        index={0}
        eachColumn={{
          label: 'body_5',
          name: 'body_5',
          type: ['String'],
        }}
      />
    );
    expect(container).toBeDefined();
  });
});
