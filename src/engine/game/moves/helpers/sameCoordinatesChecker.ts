import type { ChessPosition } from '~/types';

export const sameCoordinatesChecker =
  (a: ChessPosition) =>
  (b: ChessPosition): boolean =>
    a.x === b.x && a.y === b.y;
