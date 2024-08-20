import React from 'react';
import { render, screen } from '@testing-library/react';
import type { ChessColour } from '~/types';
import * as Hooks from '~/hooks';
import { Game } from '.';

jest.mock('~/hooks', () => ({
  __esModule: true,
  ...jest.requireActual('~/hooks'),
}));

const gameContextMock = {
  record: [],
  createNewGame: () => null,
  currentGame: {
    id: 1,
    turn: 'white' as ChessColour,
    finished: false,
    removedPieces: [],
    board: [],
  }, // TODO: replace with newGame()
};

describe('Game', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render Chess Game', () => {
    const useGameContextSpy = jest.spyOn(Hooks, 'useGameContext')
      .mockReturnValue(gameContextMock);
    render(<Game />);

    const gameElement = screen.getByRole(/game/);
    expect(gameElement).toBeInTheDocument();

    const turnElement = screen.getByText(/turn/i);
    expect(turnElement).toBeInTheDocument();

    expect(useGameContextSpy).toHaveBeenCalled();
  });
});
