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

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CheckboxInput from '..';

describe('It should test the CheckboxInput Component', () => {
  const mockEachColumn = {
    label: 'body_0',
    name: 'body_0',
    type: ['String'],
  };

  const mockSelectedColumn = [
    {
      label: 'body_0',
      name: 'body_0',
      type: ['String'],
    },
  ];
  it('Should render the CheckboxInput Component', () => {
    const container = render(
      <CheckboxInput
        selectedColumns={[]}
        handleDisableCheckbox={jest.fn()}
        eachColumn={mockEachColumn}
        onMultipleSelection={jest.fn()}
      />
    );
    expect(container).toBeDefined();
  });
  it('Trigger onChange()', () => {
    const container = render(
      <CheckboxInput
        selectedColumns={mockSelectedColumn}
        handleDisableCheckbox={jest.fn()}
        eachColumn={mockEachColumn}
        onMultipleSelection={jest.fn()}
      />
    );
    const btn = container.getByTestId('transformation-checkbox-select-multiple-columns');
    fireEvent.click(btn);
  });
});
