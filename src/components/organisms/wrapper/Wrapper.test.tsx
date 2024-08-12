import React from 'react';
import { render, screen } from '@testing-library/react';
import { Wrapper } from '.';

describe('Wrapper', () => {
  it('Should render "React Chess" title', () => {
    render(<Wrapper />);
    const element = screen.getByText(/React Chess/);
    expect(element).toBeInTheDocument();
  });
});
