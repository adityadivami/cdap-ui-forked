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
import RenderLabel from 'components/FooterPanel/Components/common/TabWrapper/index';

describe('Testing Tab Wrapper Component , check if children is renderinng along with parent element', () => {
  const dummyElement = <h1>Hello</h1>;
  it('Should Render component with size as small and to have property display flex', () => {
    render(
      <RenderLabel size={'small'}>
        <h1 data-testid="child-for-render-label">Child</h1>
      </RenderLabel>
    );
    const childElement = screen.getByTestId(/child-for-render-label/i);
    expect(childElement).toBeInTheDocument();
    const smallElement = screen.getByTestId(/footer-panel-small-tab/i);
    expect(smallElement).toBeInTheDocument();
    const style = window.getComputedStyle(smallElement);
    expect(style.display).toBe('flex');
  });

  it('Should Render component with size as medium and to have property text align centre', () => {
    render(
      <RenderLabel size={'medium'}>
        <h1 data-testid="child-for-render-label">Child</h1>
      </RenderLabel>
    );
    const childElement = screen.getByTestId(/child-for-render-label/i);
    expect(childElement).toBeInTheDocument();
    const mediumElement = screen.getByTestId(/footer-panel-medium-tab/i);
    expect(mediumElement).toBeInTheDocument();
    const style = window.getComputedStyle(mediumElement);
    expect(style.textAlign).toBe('center');
  });

  it('Should Render component with size as large and to have property width 65%', () => {
    render(
      <RenderLabel size={'large'}>
        <h1 data-testid="child-for-render-label">Child</h1>
      </RenderLabel>
    );
    const childElement = screen.getByTestId(/child-for-render-label/i);
    expect(childElement).toBeInTheDocument();
    const largeElement = screen.getByTestId(/footer-panel-large-tab/i);
    expect(largeElement).toBeInTheDocument();
    const style = window.getComputedStyle(largeElement);
    expect(style.width).toBe('65%');
  });
});
