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

import { fireEvent, render ,screen} from '@testing-library/react';
import React from 'react';

import NestedMenu from 'components/GridTable/components/NestedMenu/index';

describe('Testing nested menu component', () => {
  it('should test default render of nested menu', () => {
    const x =  [{label: 'test',
    supported_dataType: ['test'],
    value: 'test',
    options: [{label: 'test',
    supported_dataType: ['test'],
    value: 'test',
    options: []}]}]
    render(
      <NestedMenu
        submitMenuOption={() => {jest.fn()}}
        columnType={'test'}
        menuOptions={x}
        title={'hello'}
        anchorElement={[]}
        setAnchorElement={() => jest.fn()}
        open={true}
        handleMenuOpenClose={() => jest.fn()}

      />
    );

    const parentElement = screen.getByTestId(/menu-item-parent/i);
    fireEvent.click(parentElement);
    fireEvent.click(screen.getByTestId(/nested-menu-parent-root/i));

  });

  it('should test default render of nested menu with options as empty', () => {
    const x =  [{label: 'test',
    supported_dataType: ['test'],
    value: 'test',
    options: []}]
    render(
      <NestedMenu
        submitMenuOption={() => {jest.fn()}}
        columnType={'test'}
        menuOptions={x}
        title={'hello'}
        anchorElement={[<h1>hello</h1>]}
        setAnchorElement={(x) => jest.fn()}
        open={false}
        handleMenuOpenClose={() => jest.fn()}
      />
    );

    const ele = screen.getByTestId(/menu-item-parent/i);
    fireEvent.click(ele);
  });
});
