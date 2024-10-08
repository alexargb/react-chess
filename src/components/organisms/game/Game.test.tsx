import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Hooks from '~/hooks';
import { Game } from '.';
import { Game as GameClass } from '~/engine';

jest.mock('~/hooks', () => ({
  __esModule: true,
  ...jest.requireActual('~/hooks'),
}));

const gameContextMock = {
  record: [],
  createNewGame: () => null,
  currentGame: new GameClass(),
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

    expect(useGameContextSpy).toHaveBeenCalled();
  });
});
