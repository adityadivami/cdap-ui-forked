import React from 'react';
import { render, screen } from '@testing-library/react';
import WranglerHomeNew from '../index';

test('renders lWrangler', () => {
  render(<WranglerHomeNew />);
  const ele = screen.getByTestId(/wrangler-home-new-parent/i);
  expect(ele).toBeInTheDocument();
});
