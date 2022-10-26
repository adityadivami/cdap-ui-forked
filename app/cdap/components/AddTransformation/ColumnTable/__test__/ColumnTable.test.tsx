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
import ColumnTable from '..';

describe('Should test ColumnTable Component', () => {
  it('Should render ColumnTable Component', () => {
    const mockDirectiveFunctionSupportedDataType = ['all'];
    const container = render(
      <ColumnTable
        columns={[
          {
            name: 'body_0',
            label: 'body_0',
            type: ['String'],
          },
        ]}
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        onSingleSelection={jest.fn()}
        selectedColumns={[]}
        dataQualityValue={[
          {
            label: 'body_0',
            value: '0',
          },
        ]}
        isSingleSelection={true}
        handleDisableCheckbox={jest.fn()}
        onMultipleSelection={jest.fn()}
      />
    );
    expect(container).toBeDefined();
  });
});
