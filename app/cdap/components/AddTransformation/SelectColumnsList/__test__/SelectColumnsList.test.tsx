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

import { fireEvent, render, screen } from '@testing-library/react';
import {
  mockColumnData,
  mockColumnDataForColumnList,
  mockDataQualityValue,
  mockDirectiveFunctionSupportedDataType,
} from 'components/AddTransformation/mock/mockDataForAddTransformation';
import React from 'react';
import SelectColumnsList from '..';

describe('It should test the SelectColumnsList Component', () => {
  it('Should render the SelectColumnsList Component with functionName "uppercase" ', () => {
    const container = render(
      <SelectColumnsList
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        selectedColumnsCount={1}
        columnData={mockColumnDataForColumnList}
        setSelectedColumns={jest.fn()}
        dataQuality={mockDataQualityValue}
        functionName={'uppercase'}
      />
    );
    expect(container).toBeDefined();
  });

  it('Should render the SelectedColumnList Component with functionName "delete" ', () => {
    const container = render(
      <SelectColumnsList
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        selectedColumnsCount={1}
        columnData={mockColumnDataForColumnList}
        setSelectedColumns={jest.fn()}
        dataQuality={mockDataQualityValue}
        functionName={'delete'}
      />
    );
    expect(container).toBeDefined();
  });

  it('Should render the SelectedColumnList Component with functionName "delete" ', () => {
    const container = render(
      <SelectColumnsList
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        selectedColumnsCount={1}
        columnData={mockColumnData}
        setSelectedColumns={jest.fn()}
        dataQuality={mockDataQualityValue}
        functionName={'delete'}
      />
    );
    expect(container).toBeDefined();
  });

  it('should render the SelectColumnsList Component with selectedColumnsCount is 0 and data quality array and trigger the multiple selection function', () => {
    const mockSetSelected = jest.fn();
    const container = render(
      <SelectColumnsList
        selectedColumnsCount={0}
        columnData={[
          { label: 'hello', type: ['a', 'b'], name: 'test' },
          { label: 'hello', type: ['a', 'b'], name: 'test' },
        ]}
        setSelectedColumns={mockSetSelected}
        dataQuality={[
          { label: 'hello', value: '' },
          { label: 'world', value: '' },
        ]}
        directiveFunctionSupportedDataType={['TEST', 'all']}
        functionName={'join-columns'}
      />
    );
    const ele = screen.getAllByTestId('transformation-checkbox-select-multiple-columns');
    fireEvent.click(ele[0], { target: { checked: true } });
    fireEvent.click(ele[0], { target: { checked: false } });
    expect(container).toBeDefined;
  });

  it('should render the SelectColumnsList Component with selectedColumnsCount is 0 and data quality array and trigger the single selection function', () => {
    const mockSetSelected = jest.fn();
    const container = render(
      <SelectColumnsList
        selectedColumnsCount={0}
        columnData={[
          { label: 'hello', type: ['a', 'b'], name: 'test' },
          { label: 'hello', type: ['a', 'b'], name: 'test' },
        ]}
        setSelectedColumns={mockSetSelected}
        dataQuality={[
          { label: 'hello', value: '' },
          { label: 'world', value: '' },
        ]}
        directiveFunctionSupportedDataType={['TEST', 'all']}
        functionName={''}
      />
    );
    const ele = screen.getAllByTestId('transformation-radio-select-columns');
    fireEvent.click(ele[0], { target: { checked: true } });
    expect(container).toBeDefined;
  });

  it('should render the SelectColumnsList Component with some input value along with label and null', () => {
    const getSelectedColumns = jest.fn();
    const container = render(
      <SelectColumnsList
        columnData={[]}
        selectedColumnsCount={0}
        setSelectedColumns={getSelectedColumns}
        dataQuality={[
          { label: 'hello', value: '' },
          { label: 'world', value: '' },
        ]}
        directiveFunctionSupportedDataType={['all', 'test']}
        functionName={''}
      />
    );
    const inputEle = screen.getByTestId('search-column-name');
    fireEvent.change(inputEle, { target: { value: '123' } });
    expect(container).toBeDefined;
  });

  it('should render the SelectColumnsList Component with some input value along with label and null', () => {
    const container = render(
      <SelectColumnsList
        columnData={[{ label: 'hello', type: ['test'], name: 'hello' }]}
        selectedColumnsCount={1}
        setSelectedColumns={jest.fn()}
        dataQuality={[
          { label: 'hello', value: '' },
          { label: 'world', value: '' },
        ]}
        directiveFunctionSupportedDataType={['test']}
        functionName={'join-columns'}
      />
    );

    const inputEle = screen.getByTestId('search-column-name');
    fireEvent.change(inputEle, { target: { value: '123' } });
    fireEvent.change(inputEle, { target: { value: 'hello' } });
    fireEvent.change(inputEle, { target: { value: null } });

    const ele = screen.getByTestId(/search-column-icon/i);
    fireEvent.click(ele);
    expect(container).toBeDefined;
  });
});
