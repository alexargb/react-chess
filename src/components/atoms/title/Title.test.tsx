import React from 'react';
import { render, screen } from '@testing-library/react';
import { BigTitle, SmallTitle, Title } from '.';

describe('Titles', () => {
  it('Should render Title with text', () => {
    render(<Title>Test Title</Title>);
    const titleElement = screen.getByText(/Test Title/);
    expect(titleElement).toBeInTheDocument();
  });

  it('Should render BigTitle with text', () => {
    render(<BigTitle>Test Title</BigTitle>);
    const titleElement = screen.getByText(/Test Title/);
    expect(titleElement).toBeInTheDocument();
  });

  it('Should render SmallTitle with text', () => {
    render(<SmallTitle>Test Title</SmallTitle>);
    const titleElement = screen.getByText(/Test Title/);
    expect(titleElement).toBeInTheDocument();
  });
});
