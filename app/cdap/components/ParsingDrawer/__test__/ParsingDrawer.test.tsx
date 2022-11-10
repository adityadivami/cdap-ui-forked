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

import { fireEvent, render } from '@testing-library/react';
import history from 'app/cdap/services/history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import ParsingDrawer from '..';
describe('It Should Test the Parsing Drawer Component', () => {

  it('Should test the handleApply Button ', () => {
    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingDrawer setLoading={() => jest.fn()} updateDataTranformation={() => jest.fn()} />
          </Route>
        </Switch>
      </Router>
    );
    const handleApplyBtn = screen.getByTestId('parsing-apply-button');
    fireEvent.click(handleApplyBtn);
    expect(handleApplyBtn).toBeInTheDocument();
  });

  it('Should test the handleFormatChange Button ', () => {
    const { getAllByRole, getAllByTestId, getByTestId } = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingDrawer setLoading={() => jest.fn()} updateDataTranformation={() => jest.fn()} />
          </Route>
        </Switch>
      </Router>
    );
    const menu = getAllByRole('button');
    fireEvent.mouseDown(menu[0]);
    const option2 = getAllByTestId('input-select-1')[0];
    fireEvent.click(option2);

    fireEvent.mouseDown(menu[1]);
    const option3 = getAllByTestId('input-select-1')[1];
    fireEvent.click(option3);
  });
});
