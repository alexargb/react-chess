import { ChessColour, ChessPiece, ChessPieceMoveset, ChessPosition } from '~/types';

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

export const newRook = (id: number, colour: ChessColour, position: ChessPosition): ChessPiece => ({
  id,
  name: 'rook',
  shortName: 'r',
  colour,
  position,
  hasMoved: false,
  moves: getRookMoves(),
  possibleMoves: [],
});
