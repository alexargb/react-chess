import { ChessColour, ChessPiece, ChessPieceMoveset, ChessPosition } from '~/types';

export const getPawnMoves = (): ChessPieceMoveset => [
  {
    changeX: 0,
    changeY: 1,
    conditions: ['unblocked'],
    eats: false,
  },
  {
    changeX: 0,
    changeY: 2,
    conditions: ['unmoved', 'unblocked'],
    eats: false,
  },
  {
    changeX: 1,
    changeY: 1,
    conditions: ['eating', 'en passant'],
    eats: true,
  },
  {
    changeX: -1,
    changeY: 1,
    conditions: ['eating', 'en passant'],
    eats: true,
  },
];

export const newPawn = (id: number, colour: ChessColour, position: ChessPosition): ChessPiece => ({
  id,
  name: 'pawn',
  shortName: 'p',
  colour,
  position,
  hasMoved: false,
  moves: getPawnMoves().map((move) => {
    if (colour === 'white') {
      move.changeX = -move.changeX;
      move.changeY = -move.changeY;
    }
    return move;
  }),
  posibleMoves: [
    {
      changeX: 0,
      changeY: 1,
    },
    {
      changeX: 0,
      changeY: 2,
    },
  ].map((move) => {
    if (colour === 'white') {
      move.changeX = -move.changeX;
      move.changeY = -move.changeY;
    }
    return move;
  }),
});
