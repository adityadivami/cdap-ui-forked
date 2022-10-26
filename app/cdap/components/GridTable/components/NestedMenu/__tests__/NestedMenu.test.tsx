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
import NestedMenu from 'components/GridTable/components/NestedMenu/index';
import React from 'react';

describe('Testing NestedMenu Component', () => {
  const container = render(
    <NestedMenu
      icon={undefined}
      submitMenuOption={() => jest.fn()}
      columnType={''}
      menuOptions={undefined}
      title={''}
    />
  );
  it('Should render the component with all pre defined props', () => {
    expect(container).toBeDefined();
  });

  it('Should trigger the icon button', () => {
    render(
      <NestedMenu
        icon={undefined}
        submitMenuOption={() => jest.fn()}
        columnType={''}
        menuOptions={undefined}
        title={''}
      />
    );
    const buttonEle = screen.getAllByTestId('nested-menu-icon-button');
    fireEvent.click(buttonEle[0]);
    expect(buttonEle[0]).toBeInTheDocument();
  });

  it('Should trigger the menu item click with menuOptions and options', () => {
    render(
      <NestedMenu
        icon={undefined}
        submitMenuOption={() => jest.fn()}
        columnType={''}
        menuOptions={[{ name: 'test', options: [{ id: 1 }, { id: 2 }] }]}
        title={''}
      />
    );
    const menuButton = screen.getByTestId('menu-item-click-menu');
    fireEvent.click(menuButton);
    expect(menuButton).toBeInTheDocument();
  });
  it('Should trigger the menu item click withhout menuOptions , options', () => {
    render(
      <NestedMenu
        icon={undefined}
        submitMenuOption={() => jest.fn()}
        columnType={''}
        menuOptions={[{ name: 'test' }]}
        title={''}
      />
    );
    const menuItemButton = screen.getByTestId('menu-item-click-menu');
    fireEvent.click(menuItemButton);
    expect(menuItemButton).toBeInTheDocument();
  });

  it('Should trigger the menu  click ', () => {
    render(
      <NestedMenu
        icon={undefined}
        submitMenuOption={() => jest.fn()}
        columnType={''}
        menuOptions={[{ name: 'test' }]}
        title={''}
      />
    );
    const menuItemButton = screen.getAllByTestId('menu-nested-menu');
    fireEvent.click(menuItemButton[0]);
    expect(menuItemButton[0]).toBeInTheDocument();
  });
});
