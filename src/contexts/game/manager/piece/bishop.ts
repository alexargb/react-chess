import { ChessColour, ChessPiece, ChessPieceMoveset, ChessPosition } from '~/types';

export const getBishopMoves = (): ChessPieceMoveset => [
  {
    changeX: 'x',
    changeY: 'x',
    eats: true,
  },
];

export const newBishop = (id: number, colour: ChessColour, position: ChessPosition): ChessPiece => ({
  id,
  name: 'bishop',
  shortName: 'b',
  colour,
  position,
  hasMoved: false,
  moves: getBishopMoves(),
  possibleMoves: [],
});
