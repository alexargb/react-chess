import type { ChessPosition } from '~/types';

export const getDistanceToBorders = (position: ChessPosition) => ({
  top: 7 - position.y,
  bottom: position.y,
  right: 7 - position.x,
  left: position.x,
});
