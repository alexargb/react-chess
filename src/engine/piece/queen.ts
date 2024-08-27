import type { ChessPieceMoveset } from '~/types';

export const getQueenMoves = (): ChessPieceMoveset => [
  {
    changeX: 0,
    changeY: 'x',
    eats: true,
  },
  {
    changeX: 'x',
    changeY: 0,
    eats: true,
  },
  {
    changeX: 'x',
    changeY: 'x',
    eats: true,
  },
];

export const getQueenBasicMoves = () => ({
  moves: getQueenMoves(),
  possibleMoves: [],
});
