import type { ChessGame } from '~/types';
import { newBoard } from '../board';

let local_id = 0;

export const newGame = (id?: number): ChessGame => ({
  id: id || (local_id++),
  board: newBoard(),
  turn: 'white',
  finished: false,
});
