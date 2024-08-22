import type { ChessPieceStrictMove, ChessPosition, ChessSquare } from '~/types';
import { getDistanceToBorders } from './distanceToBorders';

const promotes = (
  square: ChessSquare,
  finalPosition: ChessPosition,
): boolean => {
  const isPawn = square.piece?.shortName === 'p';
  const { top, bottom } = getDistanceToBorders(finalPosition);

  return isPawn && (top === 0 || bottom === 0);
};

export const getChessPieceStrictMove = (
  square: ChessSquare,
  position: ChessPosition,
  enemySquare?: ChessSquare,
): ChessPieceStrictMove => ({
  changeX: position.x - square.x,
  changeY: position.y - square.y,
  hitsKing: enemySquare?.piece?.shortName === 'k',
  promotes: promotes(square, position),
});
