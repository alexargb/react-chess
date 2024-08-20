import React from 'react';
import type { GameContextState } from '~/contexts/game/types';
import { useGameContext } from '.';
import { newGame } from '~/engine';

const mockContextState: GameContextState = {
  currentGame: {
    id: 1,
    board: [],
    turn: 'white',
    finished: false,
    removedPieces: [],
  },
  record: [],
  createNewGame: newGame,
};

describe('useGameContext', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should return state correctly', () => {
    const useContextSpy = jest.spyOn(React, 'useContext').mockImplementation(() => mockContextState);

    const result = useGameContext();

    expect(result?.currentGame?.id).toBe(1);
    expect(result?.currentGame?.turn).toBe('white');
    expect(result?.currentGame?.finished).toBe(false);
    expect(useContextSpy).toHaveBeenCalled();
  });
});
