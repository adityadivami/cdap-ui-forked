import React from 'react';
import { render } from '@testing-library/react';
import TransitionComponent from '../index';
import { Router, Switch, Route } from 'react-router';
import history from 'app/cdap/services/history';

describe('Test Transition Component', () => {
  it('Should have rendered the component correctly with isSuccess as false', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <TransitionComponent
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

  it('Should have rendered the component correctly with isSuccess as false', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <TransitionComponent
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
