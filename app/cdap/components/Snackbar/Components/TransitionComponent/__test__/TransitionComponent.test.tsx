import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TransitionComponent from '../index';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory as createHistory } from 'history';

const history = createHistory({
  basename: '/',
});

describe('Test Transition Component', () => {
  const handleClose = jest.fn();

  it('Should have rendered the component correctly', () => {
    const handleClose = jest.fn();
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
