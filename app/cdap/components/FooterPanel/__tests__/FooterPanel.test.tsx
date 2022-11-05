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
import FooterPanel from 'components/FooterPanel/index';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from 'services/history';

describe('Testing Footer Panel Component - Unit tests', () => {
  it('Should check if the component is rendered with class name = showNormalView when columnViewPanelOpened is false', () => {
    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <FooterPanel
              recipeStepsCount={0}
              dataCounts={{ rowCount: 1, columnCount: 1 }}
              columnViewPanelOpened={false}
            />
          </Route>
        </Switch>
      </Router>
    );

    const ele = screen.getByTestId(/footer-panel-column-icon-container/i);
    const classes = ele.classList;
    const classname = classes[classes.length - 1];
    expect(classname).toContain('makeStyles-showNormalView');
  });

  it('Should check if element with id footerpanel-labels-title is rendered with correct dataCounts prop', () => {
    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <FooterPanel
              recipeStepsCount={10}
              dataCounts={{ rowCount: 6, columnCount: 42 }}
              columnViewPanelOpened={false}
            />
          </Route>
        </Switch>
      </Router>
    );

    const label_title = screen.getByTestId(/footerpanel-labels-title/i);
    expect(label_title).toHaveTextContent('Current data - 6 rows and 42 columns');

    const recipe_count = screen.getByTestId(/footerpanel-labels-recipeStepsCount/i);
    expect(recipe_count).toHaveTextContent('10');
  });

  it('Should expect SVG icon and labels as provided in the respective component', () => {
    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <FooterPanel
              recipeStepsCount={10}
              dataCounts={{ rowCount: 6, columnCount: 42 }}
              columnViewPanelOpened={false}
            />
          </Route>
        </Switch>
      </Router>
    );

    const svg_container = screen.getByTestId(/footer-panel-column-icon-container/i);
    expect(svg_container).toBeInTheDocument();
    const svg_element = document.getElementById('column-icon');
    expect(svg_element).toBeInTheDocument();
    expect(svg_container).toContainElement(svg_element);

    const recipe_steps_element = screen.getByTestId(/footerpanel-labels-recipesteps/i);
    expect(recipe_steps_element).toHaveTextContent('features.FooterPanel.labels.recipeSteps');

    const label_directive_element = screen.getByTestId(/footerpanel-labels-directives/i);
    expect(label_directive_element).toHaveTextContent('features.FooterPanel.labels.directives');

    const label_zoom_percent_element = screen.getByTestId(/footerpanel-labels-zoompercent/i);
    expect(label_zoom_percent_element).toHaveTextContent(
      'features.FooterPanel.labels.zoomPercent100'
    );
  });
  it('Should render the component with columnViewPanelOpened as true', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <FooterPanel
              recipeStepsCount={0}
              dataCounts={{ rowCount: 1, columnCount: 1 }}
              columnViewPanelOpened={true}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });
});
