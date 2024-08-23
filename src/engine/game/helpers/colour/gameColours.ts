import type { ChessColour, ChessGame } from '~/types';
import { getOppositeColour } from './oppositeColour';

const DEFAULT_RESPONSE: ChessColour[] = ['white', 'black'];

export const getGameColours = (game: ChessGame | null): ChessColour[] => {
  if (!game) return DEFAULT_RESPONSE;

  return [game.turn, getOppositeColour(game.turn)];
};
