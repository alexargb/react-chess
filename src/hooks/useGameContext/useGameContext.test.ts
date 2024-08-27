import React from 'react';
import type { GameContextState } from '~/contexts/game/types';
import { Game } from '~/engine';
import { useGameContext } from '.';

const mockContextState: GameContextState = {
  currentGame: new Game(),
  record: [],
  createNewGame: () => new Game(),
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
