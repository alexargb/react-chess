import type { ChessPieceMoveset } from '~/types';

export const getBishopMoves = (): ChessPieceMoveset => [
  {
    changeX: 'x',
    changeY: 'x',
    eats: true,
  },
];

export const getBishopBasicMoves = () => ({
  moves: getBishopMoves(),
  possibleMoves: [],
});
