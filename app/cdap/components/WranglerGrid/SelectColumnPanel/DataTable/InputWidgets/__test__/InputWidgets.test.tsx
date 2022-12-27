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

describe('It should render ', () => {
  it('Should render component with isSingleSelection false', () => {
    render(
      <InputWidgets
        isSingleSelection={false}
        selectedColumns={[]}
        onSingleSelection={() => jest.fn()}
        columnDetail={undefined}
        handleDisableCheckbox={() => false}
        onMultipleSelection={() => jest.fn()}
        columnIndex={0}
      />
    );

    expect(screen.getByTestId(/form-control-label-parent-0/i)).toBeInTheDocument();
  });

  it('Should render component with isSingleSelection true', () => {
    render(
      <InputWidgets
        isSingleSelection={true}
        selectedColumns={[]}
        onSingleSelection={() => jest.fn()}
        columnDetail={undefined}
        handleDisableCheckbox={() => false}
        onMultipleSelection={() => jest.fn()}
        columnIndex={0}
      />
    );

    expect(screen.getByTestId(/radio-input-0/i)).toBeInTheDocument();
  });
});
