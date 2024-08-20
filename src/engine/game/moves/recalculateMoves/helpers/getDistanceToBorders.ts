import type { ChessSquare } from '~/types';

export const getDistanceToBorders = (square: ChessSquare) => ({
  top: 7 - square.y,
  bottom: square.y,
  right: 7 - square.x,
  left: square.x,
});
