import { ChessColour, ChessPiece, ChessPieceMoveset } from '~/types';

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

export const newRook = (id: number, colour: ChessColour): ChessPiece => ({
  id,
  shortName: 'r',
  colour,
  hasMoved: false,
  moves: getRookMoves(),
  possibleMoves: [],
  pawnJustJumped: false,
});
