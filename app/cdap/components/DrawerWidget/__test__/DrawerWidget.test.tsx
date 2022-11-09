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
import history from 'services/history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import DrawerWidget from 'components/DrawerWidget';

describe('It should test DrawerWidget Component', () => {
  it('Should test whether DrawerWidget Component is rendered with showDivider,showBackIcon,openDrawer as true', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <DrawerWidget
              showDivider
              headerActionTemplate={<h1>Test</h1>}
              headingText={''}
              openDrawer
              closeClickHandler={function(): void {
                throw new Error('Function not implemented.');
              }}
              showBackIcon
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(screen.getByTestId(/box-id/i)).toBeInTheDocument();
    expect(screen.getByTestId(/header-action-template/i)).toBeInTheDocument();
    expect(screen.getByTestId(/show-divider-box/i)).toBeInTheDocument();
  });
});
