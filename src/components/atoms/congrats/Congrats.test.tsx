import React from 'react';
import type { ChessGame } from '~/types';
import { render, screen } from '@testing-library/react';
import { Congrats } from '.';

const mockGame = {
  turn: 'black',
  finished: true,
} as ChessGame;

describe('Congrats', () => {
  it('Should render White Congrats', () => {
    render(<Congrats game={mockGame}/>);

    expect(screen.getByRole(/congrats/)).toBeInTheDocument();
    expect(screen.getByText(/White won!/)).toBeInTheDocument();
    expect(() => {
      screen.getByText(/Black won!/);
    }).toThrow();
  });

  it('Should render Black Congrats', () => {
    mockGame.turn = 'white';
    render(<Congrats game={mockGame}/>);

    expect(screen.getByRole(/congrats/)).toBeInTheDocument();
    expect(screen.getByText(/Black won!/)).toBeInTheDocument();
    expect(() => {
      screen.getByText(/White won!/);
    }).toThrow();
  });
});
