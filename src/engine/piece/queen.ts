import { ChessColour, ChessPiece, ChessPieceMoveset } from '~/types';

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

export const newQueen = (id: number, colour: ChessColour): ChessPiece => ({
  id,
  shortName: 'q',
  colour,
  hasMoved: false,
  moves: getQueenMoves(),
  possibleMoves: [],
  pawnJustJumped: false,
});
