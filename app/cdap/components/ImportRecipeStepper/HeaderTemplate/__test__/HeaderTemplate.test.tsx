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
import HeaderTemplate from 'components/ImportRecipeStepper/HeaderTemplate';
import React from 'react';

describe('Test Import Recipe Stepper', () => {
  it('Should render Import Recipe Stepper', () => {
    render(<HeaderTemplate headingText={'Import Recipe'} previousStep={jest.fn()} />);
    const wrapper = screen.getByTestId(/import-recipe-header/i);
    expect(wrapper).toBeInTheDocument();
  });

  it('Should render Import Recipe Stepper and headingText should be as expected.', () => {
    render(<HeaderTemplate headingText={'Import Recipe'} previousStep={jest.fn()} />);
    const headingText = screen.getByTestId(/import-recipe-stepper-heading-text/i);
    expect(headingText).toHaveTextContent('Import Recipe');
  });

  it('Should test back-icon-step is in the Document and previousStep function is called', () => {
    render(<HeaderTemplate headingText={'Import Recipe'} previousStep={jest.fn()} />);
    const backIconStep = screen.getByTestId(/back-icon-step/i);
    fireEvent.click(backIconStep);
    expect(backIconStep).toBeInTheDocument();
  });

  it('Should test whether close-icon-step is in the Document and it triggers  previousStep function.', () => {
    render(<HeaderTemplate headingText={'Import Recipe'} previousStep={jest.fn()} />);
    const closeIconStep = screen.getByTestId(/close-icon-step/i);
    fireEvent.click(closeIconStep);
    expect(closeIconStep).toBeInTheDocument();
  });
});
