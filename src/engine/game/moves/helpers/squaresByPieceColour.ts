import type { ChessColour, ChessGame, ChessSquare } from '~/types';
import { pieceColourFilterFunction } from './squareHasPiece';

export const getSquaresByPieceColour = (
  game: ChessGame | null,
  colour: ChessColour,
): ChessSquare[] => {
  if (!game?.board) return [];

  return game.board.reduce<ChessSquare[]>(
    (squares, row) =>
      squares.concat(row.filter(pieceColourFilterFunction(colour))),
    [],
  );
};
