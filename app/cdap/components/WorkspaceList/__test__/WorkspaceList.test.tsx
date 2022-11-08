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

import { render, screen } from '@testing-library/react';
import WorkspaceList from 'components/WorkspaceList';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from 'services/history';
import T from 'i18n-react';
import LoadingSVG from 'components/shared/LoadingSVG';

describe('Test the Workspace List Component', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <WorkspaceList />
          </Route>
        </Switch>
      </Router>
    );
  });
  it('Should render the Workspace List Component parent and check if body is present', () => {
    const workspaceListContainerElement = screen.getByTestId(/workspace-list-parent/i);
    const workspaceListBody = screen.getByTestId(/workspace-list-body/i);

    expect(workspaceListContainerElement).toBeInTheDocument();

    expect(workspaceListContainerElement).toContainElement(workspaceListBody);
  });

  it('Should should have Workspaces Label in Breadcrumb', () => {
    const BreadcrumbLabelElement = screen.getByTestId(/breadcrumb-label-workspaces/i);

    expect(BreadcrumbLabelElement).toHaveTextContent(
      'features.WranglerNewUI.Breadcrumb.labels.workSpaces'
    );
  });

  it('Should expect correct text as expected inside link', () => {
    const linkElement = screen.getByTestId(/link-type-wrangle-home/i);
    expect(linkElement).toHaveTextContent(
      `${T.translate('features.WranglerNewUI.Breadcrumb.labels.wrangleHome')}`
    );
  });

  it('Should render loading icon when loading is true', () => {
    const loadingIconElement = screen.getByTestId(/workspace-loading-icon/i);
    expect(loadingIconElement).toBeInTheDocument();
  });
});
