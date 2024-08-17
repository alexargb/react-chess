import { ChessColour, ChessPiece, ChessPieceMoveset, ChessPosition } from '~/types';

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

export const newKnight = (id: number, colour: ChessColour, position: ChessPosition): ChessPiece => ({
  id,
  name: 'knight',
  shortName: 'n',
  colour,
  position,
  hasMoved: false,
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
  pawnJustJumped: false,
});
