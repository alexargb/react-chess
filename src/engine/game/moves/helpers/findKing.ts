import type { ChessSquare } from '~/types';

export const findKing = (squaresSet: ChessSquare[]): ChessSquare | null => {
  const kingSquare = squaresSet.find(
    (square) => square.piece?.shortName === 'k',
  );
  return kingSquare || null;
};
