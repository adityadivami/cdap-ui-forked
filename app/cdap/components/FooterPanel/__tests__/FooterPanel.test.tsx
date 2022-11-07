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
import FooterPanel from 'components/FooterPanel/index';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from 'services/history';

describe('Testing Footer Panel Component', () => {
  it('Should check if the component is rendered ', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <FooterPanel recipeStepsCount={42} gridMetaInfo={{ rowCount: 1, columnCount: 1 }} />
          </Route>
        </Switch>
      </Router>
    );
    const parentElement = screen.getByTestId(/footer-panel-parent/i);
    expect(parentElement).toBeInTheDocument();
  });
});
