import type { ChessBoard, ChessBoardCoordinate, ChessColour, ChessPieceShortName, ChessSquare } from '~/types';
import { newPiece } from './piece';

const BASE_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];

const getPositionColour = (x: ChessBoardCoordinate, y: ChessBoardCoordinate): ChessColour => {
  const sum = x + y;
  const rest = sum % 2;

  return rest ? 'black' : 'white';
};

const getPieceColour = (y: ChessBoardCoordinate): ChessColour => {
  if (y < 4) return 'black';
  return 'white';
}

const newSquare = (
  x: ChessBoardCoordinate,
  y: ChessBoardCoordinate,
  shortName: ChessPieceShortName,
): ChessSquare => {
  const id = y * 8 + x;
  const squareColour = getPositionColour(x, y);
  const pieceColour = getPieceColour(y);

  return {
    x,
    y,
    colour: squareColour,
    piece: newPiece(id, shortName, pieceColour),
    marked: false,
    selected: false,
  };
};

export const newBoard = (): ChessBoard => BASE_BOARD.map((row, posY) => {
  const y = posY as ChessBoardCoordinate;
  return row.map((shortName, posX) => {
    const x = posX as ChessBoardCoordinate;
    return newSquare(x, y, shortName as ChessPieceShortName);
  });
});
