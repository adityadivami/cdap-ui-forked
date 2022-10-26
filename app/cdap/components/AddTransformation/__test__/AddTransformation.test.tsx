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
import React from 'react';
import AddTransformation from '..';
import {
  mockDirectiveFunctionSupportedDataType,
  mockFunctionName,
  mockColumnData,
  mockMissingDataList,
} from '../mock/mockDataForAddTransformation';

describe('It should test the AddTransformatio Component', () => {
  it('Should render the AddTransformation Component', () => {
    const container = render(
      <AddTransformation
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        functionName={mockFunctionName}
        columnData={mockColumnData}
        missingDataList={mockMissingDataList}
        callBack={jest.fn()}
        applyTransformation={jest.fn()}
      />
    );
    expect(container).toBeDefined();
  });

  it('Trigger handleSelectColumn()', () => {
    render(
      <AddTransformation
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        functionName={mockFunctionName}
        columnData={mockColumnData}
        missingDataList={mockMissingDataList}
        callBack={jest.fn()}
        applyTransformation={jest.fn()}
      />
    );

    const btn = screen.getByTestId('select-column-button');
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });
  it('Trigger closeClickHandler() and closeSelectColumnsPopupWithoutColumn()', () => {
    render(
      <AddTransformation
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        functionName={mockFunctionName}
        columnData={mockColumnData}
        missingDataList={mockMissingDataList}
        callBack={jest.fn()}
        applyTransformation={jest.fn()}
      />
    );

    const btn = screen.getByTestId('select-column-button');
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();

    const btn2 = screen.getAllByTestId('back-icon')[0];
    fireEvent.click(btn2);

    const btn3 = screen.getAllByTestId('drawer-widget-close-round-icon')[0];
    fireEvent.click(btn3);
  });

  it('Trigger handleApply()', () => {
    render(
      <AddTransformation
        directiveFunctionSupportedDataType={mockDirectiveFunctionSupportedDataType}
        functionName={mockFunctionName}
        columnData={mockColumnData}
        missingDataList={mockMissingDataList}
        callBack={jest.fn()}
        applyTransformation={jest.fn()}
      />
    );

    const selectColumnButton = screen.getByTestId('select-column-button');
    fireEvent.click(selectColumnButton);
    const columnSelectRadio = screen.getAllByTestId('transformation-radio-select-columns')[0];
    fireEvent.click(columnSelectRadio);
    const doneBtn = screen.getByTestId('done-step-button');
    fireEvent.click(doneBtn);
    const applyBtn = screen.getByTestId('apply-step-button');
    fireEvent.click(applyBtn);
  });
});
