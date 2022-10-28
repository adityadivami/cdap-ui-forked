import { render } from '@testing-library/react';
import history from 'app/cdap/services/history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import TransitionComponent from '../index';

describe('Test Transition Component', () => {
  it('Should have rendered the component correctly', () => {
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
});
