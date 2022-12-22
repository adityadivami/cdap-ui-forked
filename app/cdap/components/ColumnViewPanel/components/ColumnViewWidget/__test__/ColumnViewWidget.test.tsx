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
import ColumnViewWidget from 'components/ColumnViewPanel/components/ColumnViewWidget/index';
import { act } from 'react-dom/test-utils';

describe('It should test ColumnViewWidget Component', () => {

  const mockSearchTermFunction = jest.fn()

  it('Should render Column View Widget Component and click on search icon for the input to be in the screen', async () => {
    render(
      <ColumnViewWidget
        headingText={'Column View'}
        onClose={jest.fn()}
        onSearchTermChange={mockSearchTermFunction}
        children={<></>}
        searchValue={''}
      />
    );

    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-term-input');
    fireEvent.change(searchInput, {target:{value:'test'}});
    expect(mockSearchTermFunction).toBeCalled()
    expect(searchInput).toHaveValue('test')
  });
});
