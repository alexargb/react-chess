import React from 'react';
import type { ChessGame } from '~/types';
import { render, screen } from '@testing-library/react';
import { Congrats } from '.';

const mockGame = {
  turn: 'black',
  finished: true,
  finishWinner: 'white',
} as ChessGame;

describe('Congrats', () => {
  it('Should render White Congrats', () => {
    render(<Congrats game={mockGame}/>);

    expect(screen.getByRole(/congrats/)).toBeInTheDocument();
    expect(screen.getByText(/White won!/)).toBeInTheDocument();
    expect(() => {
      screen.getByText(/Black won!/);
    }).toThrow();
    expect(() => {
      screen.getByText(/Stalemate/);
    }).toThrow();
  });

  it('Should render Black Congrats', () => {
    mockGame.turn = 'white';
    mockGame.finishWinner = 'black';
    render(<Congrats game={mockGame}/>);

    expect(screen.getByRole(/congrats/)).toBeInTheDocument();
    expect(screen.getByText(/Black won!/)).toBeInTheDocument();
    expect(() => {
      screen.getByText(/White won!/);
    }).toThrow();
    expect(() => {
      screen.getByText(/Stalemate/);
    }).toThrow();
  });

  it('Should render Stalemate Congrats', () => {
    mockGame.turn = 'white';
    mockGame.finishWinner = 'stalemate';
    render(<Congrats game={mockGame}/>);

    expect(screen.getByRole(/congrats/)).toBeInTheDocument();
    expect(screen.getByText(/Stalemate/)).toBeInTheDocument();
    expect(() => {
      screen.getByText(/White won!/);
    }).toThrow();
    expect(() => {
      screen.getByText(/Black won!/);
    }).toThrow();
  });
});
