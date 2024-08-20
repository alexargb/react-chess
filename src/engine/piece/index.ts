import type {
  ChessColour,
  ChessPiece,
  ChessPieceShortName,
  ChessPosition,
} from '~/types';

import { newKing } from './king';
import { newQueen } from './queen';
import { newRook } from './rook';
import { newBishop } from './bishop';
import { newKnight } from './knight';
import { newPawn } from './pawn';

const NAME_MAP = {
  'k': newKing,
  'q': newQueen,
  'r': newRook,
  'b': newBishop,
  'n': newKnight,
  'p': newPawn,
  '-': () => undefined,
};

export const newPiece = (
  id: number,
  shortName: ChessPieceShortName,
  colour: ChessColour,
): ChessPiece | undefined => {
  const getNewPiece = NAME_MAP[shortName];
  return getNewPiece(id, colour);
};

export {
  newKing,
  newQueen,
  newRook,
  newBishop,
  newKnight,
  newPawn,
};
