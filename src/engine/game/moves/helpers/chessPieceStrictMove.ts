import type { ChessPieceStrictMove, ChessPosition, ChessSquare } from '~/types';

export const getChessPieceStrictMove = (
  square: ChessSquare,
  position: ChessPosition,
  enemySquare?: ChessSquare,
): ChessPieceStrictMove => ({
  changeX: position.x - square.x,
  changeY: position.y - square.y,
  hitsKing: enemySquare?.piece?.shortName === 'k',
});
