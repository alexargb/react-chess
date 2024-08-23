import type { ChessGame, ChessSquare } from '~/types';
import { getSquaresByPieceColour } from './squaresByPieceColour';

const squarePieceHasPossibleMoves = (square: ChessSquare): boolean => {
  if (!square.piece) return false;
  return square.piece.possibleMoves.length > 0;
};

export const turnHasPossibleMoves = (game: ChessGame): boolean => {
  if (!game?.board) return false;
  const ownSquares = getSquaresByPieceColour(game, game.turn);
  return ownSquares.some(squarePieceHasPossibleMoves);
};
