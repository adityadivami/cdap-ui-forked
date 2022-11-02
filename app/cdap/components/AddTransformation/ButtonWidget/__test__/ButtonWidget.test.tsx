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
import ButtonWidget from 'components/AddTransformation/ButtonWidget';

describe('Should test ButtonWidget Component', () => {
  it('Should render the ButtonWidget Component', () => {
    const container = render(
      <ButtonWidget
        buttonText={'Select column'}
        disabled={false}
        onClick={jest.fn()}
        variant={'outlined'}
        className={'makeStyles-selectButtonStyles-698'}
        dataTestId={'select-column-button'}
      />
    );

    expect(container).toBeDefined();
  });

  it('Should click the button in the ButtonWidget Component', () => {
    const container = render(
      <ButtonWidget
        buttonText={'Select column'}
        disabled={false}
        onClick={jest.fn()}
        variant={'outlined'}
        className={'makeStyles-selectButtonStyles-698'}
        dataTestId={'select-column-button'}
      />
    );

    const buttonWidgetButton = container.getByTestId('select-column-button');
    fireEvent.click(buttonWidgetButton);
  });

  it('Should should have Button Text as Select column', () => {
    const container = render(
      <ButtonWidget
        buttonText={'Select column'}
        disabled={false}
        onClick={jest.fn()}
        variant={'outlined'}
        className={'makeStyles-selectButtonStyles-698'}
        dataTestId={'select-column-button'}
      />
    );

    const buttonWidgetButton = container.getByTestId('select-column-button');
    expect(buttonWidgetButton).toHaveTextContent('Select column');
  });
});
