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
import InputWidgets from '..';

describe('It Should test InputWidgets Component', () => {
  it('Should test InputWidget Component', () => {
    const mockEachColumn = {
      label: 'body_5',
      name: 'body_5',
      type: ['String'],
    };

    const mockSelectedColumns = [
      {
        label: 'body_0',
        name: 'body_0',
        type: ['String'],
      },
    ];

    const container = render(
      <InputWidgets
        isSingleSelection={false}
        selectedColumns={mockSelectedColumns}
        onSingleSelection={jest.fn()}
        eachColumn={mockEachColumn}
        handleDisableCheckbox={jest.fn()}
        onMultipleSelection={jest.fn()}
      />
    );
    expect(container).toBeDefined();
  });
});
