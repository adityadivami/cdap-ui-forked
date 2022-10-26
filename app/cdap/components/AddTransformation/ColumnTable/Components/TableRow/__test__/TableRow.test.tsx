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

import { render } from '@testing-library/react';
import React from 'react';
import TableRow from '..';

describe('It Should test TableRow Component', () => {
  const mockSelectedColumns = [
    {
      label: 'body_5',
      name: 'body_5',
      type: ['String'],
    },
  ];

  const mockDataQualityValue = [
    {
      label: 'body_0',
      value: '0',
    },
    {
      label: 'body_1',
      value: '0',
    },
    {
      label: 'body_2',
      value: '0',
    },
  ];

  const mockEachColumn = {
    label: 'body_5',
    name: 'body_5',
    type: ['String'],
  };

  it('Should test TableRow Component', () => {
    const container = render(
      <TableRow
        onSingleSelection={jest.fn()}
        selectedColumns={mockSelectedColumns}
        dataQualityValue={mockDataQualityValue}
        isSingleSelection={false}
        handleDisableCheckbox={jest.fn()}
        onMultipleSelection={jest.fn()}
        index={0}
        eachColumn={mockEachColumn}
      />
    );
    expect(container).toBeDefined();
  });
});
