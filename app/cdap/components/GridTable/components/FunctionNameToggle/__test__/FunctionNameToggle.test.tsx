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

import { render, screen } from '@testing-library/react';
import React from 'react';
import FunctionNameToggle from 'components/GridTable/components/FunctionNameToggle/index';
import T from 'i18n-react';

describe('Testing render FunctionNameToggle component', () => {
  const PREFIX = 'features.WranglerNewUI.GridPage';

  it('Should render component with all the parent elements and child elements', () => {
    render(
      <FunctionNameToggle
        setShowName={() => {
          jest.fn();
        }}
        showName={false}
      />
    );

    const nameToggleParentElement = screen.getAllByTestId(
      /transformations-toolbar-icons-function-name-toggler/i
    );

    // Check if parent element is rendered on screen
    expect(nameToggleParentElement[0]).toBeInTheDocument();

    const nameToggleChildLabel = screen.getByTestId(/name-toggle-child-label/i);

    // Child label element should have expected text inside.
    expect(nameToggleChildLabel).toHaveTextContent(
      `${T.translate(`${PREFIX}.toolbarIcons.labels.toggleDescription`)}`
    );

    // const switchInputElement = screen.getAllByTestId(
    //   /transformations-toolbar-icons-function-name-toggler/i
    // );

    //   expect(switchInputElement).toBeInTheDocument();
  });
});
