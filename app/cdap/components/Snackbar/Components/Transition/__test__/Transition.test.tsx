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

import React from 'react';
import { render } from '@testing-library/react';
import Transition from 'components/Snackbar/Components/Transition/index';
import { Router, Switch, Route } from 'react-router';
import history from 'app/cdap/services/history';

describe('Test Transition Component', () => {
  it('Should have rendered the component correctly with isSuccess as false', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <Transition
              handleClose={() => jest.fn()}
              isSuccess={false}
              actionType={''}
              messageToDisplay={''}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });

  it('Should have rendered the component correctly with action type as add', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <Transition
              handleClose={() => jest.fn()}
              isSuccess={true}
              actionType={'add'}
              messageToDisplay={''}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });
});
