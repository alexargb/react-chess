import type { ChessPieceMoveset } from '~/types';

export const getRookMoves = (): ChessPieceMoveset => [
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
];

export const getRookBasicMoves = () => ({
  moves: getRookMoves(),
  possibleMoves: [],
});
