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

import { render } from '@testing-library/react';
import FormInputCheckbox from 'components/FormInputCheckbox';
import React, { ChangeEvent } from 'react';
import { Route, Router, Switch } from 'react-router';
import history from 'services/history';

describe('Should Test the FormInputCheckbox Component', () => {
  it('Should test whether FormInputCheckbox component is rendered or not', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <FormInputCheckbox
              label={''}
              value={false}
              onChange={function(e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
              className={''}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });
});
