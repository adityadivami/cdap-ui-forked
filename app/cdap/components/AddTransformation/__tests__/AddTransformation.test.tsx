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

import { fireEvent, render, screen } from '@testing-library/react';
import history from 'services/history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import AddTransformation from 'components/AddTransformation';

describe('It should test the SelectColumnsList Component', () => {
  it('should render the SelectColumnsList Component and triggers the button and following event', () => {
    const { rerender } = render(
      <Router history={history}>
        <Switch>
          <Route>
            <AddTransformation
              functionName="null"
              directiveFunctionSupportedDataType={[]}
              columnData={[]}
              missingDataList={undefined}
              callBack={() => jest.fn()}
            />
          </Route>
        </Switch>
      </Router>
    );
    // expect(container).toBeDefined;
    const boxContainer = screen.getByTestId('box-id');
    fireEvent.click(boxContainer);
    rerender(
      <Router history={history}>
        <Switch>
          <Route>
            <AddTransformation
              functionName="null"
              directiveFunctionSupportedDataType={[]}
              columnData={[]}
              missingDataList={undefined}
              callBack={() => jest.fn()}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(boxContainer).toBeInTheDocument();
  });

  it('should render the SelectColumnsList Component where functionName is parseCSV', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <AddTransformation
              functionName="parseCSV"
              directiveFunctionSupportedDataType={[]}
              columnData={[]}
              missingDataList={undefined}
              callBack={() => jest.fn()}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined;
  });
});
