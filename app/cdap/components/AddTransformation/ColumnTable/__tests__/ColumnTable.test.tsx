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
import ColumnTable from 'components/AddTransformation/ColumnTable';
import T from 'i18n-react';

describe('It should test FunctionNameWidget Component', () => {
  it('Should render the FunctionNameWidget Component', () => {
    render(
      <ColumnTable
        columns={[{ name: 'a', type: ['test'], label: 'test' }]}
        directiveFunctionSupportedDataType={['all']}
        onSingleSelection={() => jest.fn()}
        selectedColumns={[]}
        dataQualityValue={[]}
        isSingleSelection={false}
        handleDisableCheckbox={() => false}
        onMultipleSelection={() => jest.fn()}
      />
    );
    expect(screen.getByTestId(/column-table-parent/i)).toBeInTheDocument();
    expect(screen.getByTestId(/panel-columns/i)).toHaveTextContent(`${T.translate('features.WranglerNewUI.GridPage.addTransformationPanel.columns')}`);
  });

  it('Should render the FunctionNameWidget Component with data tye as test', () => {
    render(
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
    expect(screen.getByTestId(/panel-values/i)).toHaveTextContent(`${T.translate('features.WranglerNewUI.GridPage.addTransformationPanel.nullValues')}`);
    expect(screen.getByTestId(/column-table-parent/i)).toBeInTheDocument();

  });
});
