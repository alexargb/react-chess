import type { ChessColour, ChessPiece } from '~/types';

export const getPiecesByColour = (
  pieces: ChessPiece[],
  colour: ChessColour,
): ChessPiece[] => pieces.filter((piece) => piece.colour === colour);
