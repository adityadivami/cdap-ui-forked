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
import React, { ChangeEvent } from 'react';
import InputWidgets from 'components/WranglerGrid/SelectColumnPanel/DataTable/InputWidgets';

const mockColumnList = [
  { name: 'body_1', type: ['all'], label: 'body_1' },
  { name: 'body_2', type: ['all'], label: 'body_2' },
  { name: 'body_3', type: ['all'], label: 'body_3' },
  { name: 'body_4', type: ['string'], label: 'body_4' },
  { name: 'body_5', type: ['int'], label: 'body_5' },
];

describe('It should render ', () => {
  it('Should render component with isSingleSelection false and disable checkbox is false', () => {
    render(
      <InputWidgets
        isSingleSelection={false}
        selectedColumns={[
          { name: 'body_2', type: ['all'], label: 'body_2' },
          { name: 'body_1', type: ['all'], label: 'body_1' },
        ]}
        handleSingleSelection={() => jest.fn()}
        columnDetail={{ name: 'body_2', type: ['all'], label: 'body_2' }}
        handleDisableCheckbox={() => false}
        handleMultipleSelection={() => jest.fn()}
        columnIndex={0}
      />
    );
    const checkBoxElement = screen.getByTestId(/check-box-input-0/i);
    fireEvent.change(checkBoxElement, { target: { checked: true } });
    expect(screen.getByTestId(/form-control-label-parent-0/i)).toBeInTheDocument();
  });

  it('Should render component with isSingleSelection false and disable checkbox is true', () => {
    render(
      <InputWidgets
        isSingleSelection={false}
        selectedColumns={[
          { name: 'body_2', type: ['all'], label: 'body_2' },
          { name: 'body_1', type: ['all'], label: 'body_1' },
        ]}
        handleSingleSelection={() => jest.fn()}
        columnDetail={{ name: 'body_2', type: ['all'], label: 'body_2' }}
        handleDisableCheckbox={() => true}
        handleMultipleSelection={() => jest.fn()}
        columnIndex={0}
      />
    );
    const checkBoxElement = screen.getByTestId(/check-box-input-0/i);
    fireEvent.change(checkBoxElement, { target: { checked: true } });
    expect(screen.getByTestId(/form-control-label-parent-0/i)).toBeInTheDocument();
  });

  it('Should render component with isSingleSelection true', () => {
    render(
      <InputWidgets
        isSingleSelection={true}
        selectedColumns={[{ name: 'body_2', type: ['all'], label: 'body_2' }]}
        handleSingleSelection={() => jest.fn()}
        columnDetail={{ name: 'body_2', type: ['all'], label: 'body_2' }}
        handleDisableCheckbox={() => false}
        handleMultipleSelection={() => jest.fn()}
        columnIndex={0}
      />
    );
    const radioInputElement = screen.getByTestId(/radio-input-0/i);
    fireEvent.change(radioInputElement, { target: { checked: true } });
    expect(screen.getByTestId(/radio-input-0/i)).toBeInTheDocument();
  });
});
