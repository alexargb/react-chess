import { ChessColour, ChessPiece, ChessPieceMoveset, ChessPosition } from '~/types';

export const getKingMoves = (): ChessPieceMoveset => [
  {
    changeX: 0,
    changeY: 1,
    eats: true,
  },
  {
    changeX: 0,
    changeY: -1,
    eats: true,
  },
  {
    changeX: 1,
    changeY: 0,
    eats: true,
  },
  {
    changeX: -1,
    changeY: 0,
    eats: true,
  },
  {
    changeX: 1,
    changeY: 1,
    eats: true,
  },
  {
    changeX: -1,
    changeY: 1,
    eats: true,
  },
  {
    changeX: -1,
    changeY: 1,
    eats: true,
  },
  {
    changeX: -1,
    changeY: -1,
    eats: true,
  },
  {
    changeX: 2,
    changeY: 0,
    eats: false,
    conditions: ['king castle', 'unmoved'],
  },
  {
    changeX: -2,
    changeY: 0,
    eats: false,
    conditions: ['queen castle', 'unmoved'],
  },
];

export const newKing = (id: number, colour: ChessColour, position: ChessPosition): ChessPiece => ({
  id,
  name: 'king',
  shortName: 'k',
  colour,
  position,
  hasMoved: false,
  moves: getKingMoves(),
  posibleMoves: [],
});
