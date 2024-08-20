import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Hooks from '~/hooks';
import { Game } from '.';
import { newGame } from '~/engine';

jest.mock('~/hooks', () => ({
  __esModule: true,
  ...jest.requireActual('~/hooks'),
}));

const gameContextMock = {
  record: [],
  createNewGame: () => null,
  currentGame: newGame(), // TODO: replace with newGame()
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
