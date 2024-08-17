import React, { createContext } from 'react';
import type { GameContextState, GameProviderProps } from './types';
import { useGameState } from './useGameState';

const GameContext = createContext<GameContextState>({
  games: [],
  createNewGame: () => null,
});

export const GameProvider = ({ children }: GameProviderProps) => {
  const state = useGameState();

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
