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

import { render , screen} from '@testing-library/react';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import MatchMeter from 'components/AddTransformation/CircularProgressBar';
import history from 'services/history';

describe('It should test the CircularProgressBar Component', () => {
  it('Should render the Circular-Bar component with value as 0', () => {
   render(
      <Router history={history}>
        <Switch>
          <Route>
            <MatchMeter value={0} />
          </Route>
        </Switch>
      </Router>
    );
    const valueElement = screen.getByTestId(/circular-bar-value/i);
    expect(valueElement).toHaveTextContent('0')
  });
  it('Should render the Circular-Bar compoennt with value as 101', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <MatchMeter value={101} />
          </Route>
        </Switch>
      </Router>
    );
    const valueElement = screen.getByTestId(/circular-bar-value/i);
    expect(valueElement).toHaveTextContent('101')
  });
});
