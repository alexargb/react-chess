import { ChessColour, ChessPiece, ChessPieceMoveset, ChessPosition } from '~/types';

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

export const newQueen = (id: number, colour: ChessColour, position: ChessPosition): ChessPiece => ({
  id,
  name: 'queen',
  shortName: 'q',
  colour,
  position,
  hasMoved: false,
  moves: getQueenMoves(),
  possibleMoves: [],
  pawnJustJumped: false,
});
