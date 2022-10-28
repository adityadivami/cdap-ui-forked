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
import { Route, Router, Switch } from 'react-router';
import BreadCrumb from '..';
import history from 'app/cdap/services/history';
import T from 'i18n-react';

const location = {
  state: {
    from: T.translate('features.Breadcrumb.labels.wrangleHome'),
    path: 'wrangle-home',
  },
};

describe('Test Breadcrumb Component', () => {
  const locationMock = jest.mock('react-router-dom', () => ({
    useLocation: () => ({
      pathname: 'localhost:3000/example/path',
    }),
  }));

  render(
    <Router history={history}>
      <Switch>
        <Route>
          <BreadCrumb workspaceName="abc" location={locationMock} />{' '}
        </Route>
      </Switch>
    </Router>
  );

  it('Should have the Home text in the Breadcrumb', () => {
    expect(screen.getByTestId('breadcrumb-home-text')).toHaveTextContent('Home');
  });

  it('match state should be equal to location.state.from', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <BreadCrumb workspaceName="abc" location={location} />
          </Route>
        </Switch>
      </Router>
    );
  });
});
