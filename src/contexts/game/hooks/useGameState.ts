import type { ChessGame } from '~/types';
import type { GameContextState } from '../types';
import { useState } from 'react';

let id = 0; // TODO: do this better with file reading
const getNewGame = (): ChessGame => ({
  id: id++,
  board: null,
  turn: 'white',
  finished: false,
});

export const useGameState = () => {
  const [currentGame, setCurrentGame] = useState<ChessGame>(getNewGame());

  // TODO: add game management and initialization

  const state: GameContextState = { currentGame, setCurrentGame };

  return state;
};
