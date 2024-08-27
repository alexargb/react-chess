import type { ChessColour, ChessPieceMoveset } from '~/types';

export const getKnightMoves = (): ChessPieceMoveset => [
  {
    changeX: 2,
    changeY: 1,
    eats: true,
  },
  {
    changeX: 2,
    changeY: -1,
    eats: true,
  },
  {
    changeX: -2,
    changeY: 1,
    eats: true,
  },
  {
    changeX: -2,
    changeY: -1,
    eats: true,
  },
  {
    changeX: 1,
    changeY: 2,
    eats: true,
  },
  {
    changeX: -1,
    changeY: 2,
    eats: true,
  },
  {
    changeX: 1,
    changeY: -2,
    eats: true,
  },
  {
    changeX: -1,
    changeY: -2,
    eats: true,
  },
];

export const getKnightBasicMoves = (colour: ChessColour) => ({
  moves: getKnightMoves(),
  possibleMoves: [
    {
      changeX: 1,
      changeY: 2,
    },
    {
      changeX: -1,
      changeY: 2,
    },
  ].map((move) => {
    if (colour === 'white') {
      move.changeY = -move.changeY;
    }
    return move;
  }),
});
