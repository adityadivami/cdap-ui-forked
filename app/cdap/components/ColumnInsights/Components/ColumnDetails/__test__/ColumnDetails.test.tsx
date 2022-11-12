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
import ColumnDetails from 'components/ColumnInsights/Components/ColumnDetails';

describe('It Should test ColumnDetails Component', () => {
  it('Should render ColumnDetails Component and check the parent div is in the Document and column name is as expected', () => {
    render(
      <ColumnDetails
        columnName={'body_2'}
        characterCount={'0-8'}
        distinctValues={3}
        dataTypeString={'Contains letters and numbers'}
        renameColumnNameHandler={jest.fn()}
        dataTypeHandler={jest.fn()}
        columnType={'String'}
      />
    );
    const columnDetailParent = screen.getByTestId(/column-details-parent/i);
    expect(columnDetailParent).toBeInTheDocument();
    const columnName = screen.getByTestId(/column-name/i);
    expect(columnName).toHaveTextContent('body_2');
  });

  it('Should test clicking on Edit icon and input field will be in the Document', () => {
    render(
      <ColumnDetails
        columnName={'body_2'}
        characterCount={'0-8'}
        distinctValues={3}
        dataTypeString={'Contains letters and numbers'}
        renameColumnNameHandler={jest.fn()}
        dataTypeHandler={jest.fn()}
        columnType={'String'}
      />
    );
    const editIcon = screen.getByTestId(/edit-icon/i);
    fireEvent.click(editIcon);
    const inputField = screen.getByTestId(/column-name-edit-input/i);
    expect(inputField).toBeInTheDocument();
  });
  it('Should test the input field when valid and invalid inputs are provided and trigerring onEnter().', () => {
    render(
      <ColumnDetails
        columnName={'body_2'}
        characterCount={'0-8'}
        distinctValues={3}
        dataTypeString={'Contains letters and numbers'}
        renameColumnNameHandler={jest.fn()}
        dataTypeHandler={jest.fn()}
        columnType={'String'}
      />
    );

    const editIcon = screen.getByTestId(/edit-icon/i);
    fireEvent.click(editIcon);

    const inputField = screen.getByTestId(/column-name-edit-input/i);
    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: 'body_10' } }); // When valid input is given
    expect(inputField).toHaveValue('body_10');
    fireEvent.keyDown(inputField, { key: 'Enter', code: 13, charCode: 13 });
    fireEvent.change(inputField, { target: { value: 'body_**' } }); // When invalid input is given
    expect(inputField).toHaveValue('body_**');
    const invalidText = screen.getByTestId('invalid-text');
    expect(invalidText).toHaveTextContent(
      'features.NewWranglerUI.ColumnInsights.invalidInputErrorMessage'
    );
  });
  it('Should test the input field when valid and invalid inputs are provided and trigerring onEnter().', () => {
    render(
      <ColumnDetails
        columnName={'body_2'}
        characterCount={'0-8'}
        distinctValues={3}
        dataTypeString={'Contains letters and numbers'}
        renameColumnNameHandler={jest.fn()}
        dataTypeHandler={jest.fn()}
        columnType={'String'}
      />
    );

    const editIcon = screen.getByTestId(/edit-icon/i);
    fireEvent.click(editIcon);

    const inputField = screen.getByTestId(/column-name-edit-input/i);
    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: 'body_10' } }); // When valid input is given
    inputField.blur();
  });

  it('Should test the Select Menu and trigger handleDataTypeChange', () => {
    render(
      <ColumnDetails
        columnName={'body_2'}
        characterCount={'0-8'}
        distinctValues={3}
        dataTypeString={'Contains letters and numbers'}
        renameColumnNameHandler={jest.fn()}
        dataTypeHandler={jest.fn()}
        columnType={'String'}
      />
    );

    const inputSelect = screen.getByTestId('datatype-input-select');
    expect(inputSelect).toBeInTheDocument();
    fireEvent.click(inputSelect);
    const inputSelectElement = screen.getByTestId(/select-1/i);
    expect(inputSelectElement).toBeInTheDocument();
  });
});
