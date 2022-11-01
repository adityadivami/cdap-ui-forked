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
import ColumnTable from 'components/AddTransformation/ColumnTable';

describe('It should test FunctionNameWidget Component', () => {
  it('Should render the FunctionNameWidget Component', () => {
    const container = render(
      <ColumnTable
        columns={[{ name: 'a', type: [0] }]}
        directiveFunctionSupportedDataType={['all']}
        onSingleSelection={() => jest.fn()}
        selectedColumns={[]}
        dataQualityValue={[]}
        isSingleSelection={false}
        handleDisableCheckbox={() => false}
        onMultipleSelection={() => jest.fn()}
      />
    );
    expect(container).toBeDefined();
  });

  it('Should render the FunctionNameWidget Component', () => {
    const container = render(
      <ColumnTable
        columns={[{ name: 'a', type: ['test'], label: 'test' }]}
        directiveFunctionSupportedDataType={['test']}
        onSingleSelection={() => jest.fn()}
        selectedColumns={[]}
        dataQualityValue={[]}
        isSingleSelection={false}
        handleDisableCheckbox={() => false}
        onMultipleSelection={() => jest.fn()}
      />
    );
    expect(container).toBeDefined();
  });
});
