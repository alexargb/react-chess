import type { ChessColour, ChessGame, ChessSquare } from '~/types';
import { pieceColourFilterFunction } from './squareHasPiece';

type ChessSquares = ChessSquare[];

export const getSquaresByPieceColour = (
  game: ChessGame | null,
  colour: ChessColour,
): ChessSquares => {
  if (!game?.board) return [];

  const filterSquareByPieceColour = pieceColourFilterFunction(colour);
  const reduceSquaresByPieceColour = (
    squares: ChessSquares,
    row: ChessSquares,
  ): ChessSquares => squares.concat(row.filter(filterSquareByPieceColour));

  return game.board.reduce(reduceSquaresByPieceColour, []);
};
