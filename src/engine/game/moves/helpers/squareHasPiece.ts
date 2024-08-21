import type { ChessColour, ChessSquare } from '~/types';

export const squareHasPieceFromColour = (
  square: ChessSquare | null,
  colour: ChessColour,
): boolean => !!square?.piece && square.piece.colour === colour;

export const pieceColourFilterFunction =
  (colour: ChessColour) =>
  (square: ChessSquare): boolean =>
    squareHasPieceFromColour(square, colour);
