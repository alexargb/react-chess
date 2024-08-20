import type { ChessColour, ChessGame } from '~/types';

export const checkValidatorGetter = (game: ChessGame) => {
  return (turn: ChessColour) => {};
};
