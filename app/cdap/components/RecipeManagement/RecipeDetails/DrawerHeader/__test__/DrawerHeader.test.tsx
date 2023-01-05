/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import RecipeDrawerHeader from 'components/RecipeManagement/RecipeDetails/DrawerHeader';
import React from 'react';

describe('Test RecipeDrawerHeader Component', () => {
  it('should render the RecipeDrawerHeader Component ', () => {
    const mockCloseFunction = jest.fn();
    render(<RecipeDrawerHeader onCloseDetail={mockCloseFunction} />);
    const closePanel = screen.getByTestId(/close-detail-icon-button/i);
    fireEvent.click(closePanel);
    expect(closePanel).toBeInTheDocument();
    expect(mockCloseFunction).toBeCalled();
  });
});
