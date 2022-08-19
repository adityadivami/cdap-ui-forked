import React from 'react';
import { render, screen } from '@testing-library/react';
import WranglerHomeTitle from '../index';

test('renders Wrangler-Home-New ', () => {
  render(<WranglerHomeTitle title="Hello-World" />);
  const ele = screen.getByTestId(/wrangler-home-title-text/i);
  // expect(ele.innerText).toBe('Hello-World');
  expect(ele).toHaveTextContent('Hello-World');
});
