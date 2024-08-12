import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react chess title', () => {
  render(<App />);
  const element = screen.getByText(/react chess/i);
  expect(element).toBeInTheDocument();
});
