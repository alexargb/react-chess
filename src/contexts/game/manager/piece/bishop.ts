import { ChessColour, ChessPiece, ChessPieceMoveset } from '~/types';

export const getBishopMoves = (): ChessPieceMoveset => [
  {
    changeX: 'x',
    changeY: 'x',
    eats: true,
  },
];

export const newBishop = (id: number, colour: ChessColour): ChessPiece => ({
  id,
  name: 'bishop',
  shortName: 'b',
  colour,
  hasMoved: false,
  moves: getBishopMoves(),
  possibleMoves: [],
  pawnJustJumped: false,
});
