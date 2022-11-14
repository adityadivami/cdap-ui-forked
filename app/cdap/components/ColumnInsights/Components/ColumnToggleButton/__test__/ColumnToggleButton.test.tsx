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
import ColumnToggleButton from 'components/ColumnInsights/Components/ColumnToggleButton';
import { mockDataQuality } from 'components/ColumnInsights/mock/mockDataForColumnInsights';
import React from 'react';

describe('It should test whether ColumnToggleButton Component.', () => {
  it('should test whether ColumnToggleButton Component is rendered and is in the Document', () => {
    render(
      <ColumnToggleButton dataQuality={mockDataQuality} dataTestId={'data-quality-toggle-parent'} />
    );
    const toggleButtonsParent = screen.getByTestId(/data-quality-toggle-parent/i);
    expect(toggleButtonsParent).toBeInTheDocument();
  });

  it('should test whether left toggle button is selected', () => {
    render(
      <ColumnToggleButton dataQuality={mockDataQuality} dataTestId={'data-quality-toggle-parent'} />
    );
    const leftButton = screen.getByTestId(/toggle-button-left/i);
    fireEvent.click(leftButton);
    expect(leftButton).toHaveClass(
      'MuiBox-root MuiBox-root-7 ToggleButton__StyledToggleBox-ghgQNh IkLrO makeStyles-isSelected-5'
    );
    const rightButton = screen.getByTestId(/toggle-button-right/i);
    expect(rightButton).not.toHaveClass(
      'MuiBox-root MuiBox-root-7 ToggleButton__StyledToggleBox-ghgQNh IkLrO makeStyles-isSelected-5'
    );
  });

  it('should test whether right toggle button is selected', () => {
    render(
      <ColumnToggleButton dataQuality={mockDataQuality} dataTestId={'data-quality-toggle-parent'} />
    );
    const rightButton = screen.getByTestId(/toggle-button-right/i);
    fireEvent.click(rightButton);
    expect(rightButton).toHaveClass(
      'MuiBox-root MuiBox-root-12 ToggleButton__StyledToggleBox-ghgQNh byQoWn makeStyles-isSelected-9'
    );
  });
});
