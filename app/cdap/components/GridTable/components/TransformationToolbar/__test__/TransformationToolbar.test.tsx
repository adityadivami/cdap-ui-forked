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

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import T from 'i18n-react';
import TransformationToolbar from 'components/GridTable/components/TransformationToolbar/index';

describe('Testing render TransformationToolbar component', () => {
  it('Should render component', () => {
    render(
      <TransformationToolbar
        columnType={'abhilash'}
        submitMenuOption={() => {
          jest.fn();
        }}
        setShowBreadCrumb={() => {
          jest.fn();
        }}
        showBreadCrumb={false}
      />
    );
  });

  //   const iconButtonElement = screen.getByTestId(/toolbar-icon-button/i)
  //   fireEvent.click(iconButtonElement)

  //   const transformToolbarParent = screen.getByTestId(/transformations-toolbar-container/i);

  // Should render the parent component
  //   expect(transformToolbarParent).toBeInTheDocument();

  //   const nestedMenuContainer = screen.getByTestId(/nested-menu-container"/i)

  // Check if child is rendered in the parent
  //   expect(transformToolbarParent).toContainElement(nestedMenuContainer)
});
