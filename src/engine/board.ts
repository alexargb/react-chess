import type {
  ChessBoard,
  ChessBoardCoordinate,
  ChessSquare,
} from '~/types';
import { Square } from './square';
import { BASE_BOARD } from './constants';

export class Board extends Array<Square[]> {
  constructor() {
    super();

    BASE_BOARD.forEach((row, posY) => {
      const y = posY as ChessBoardCoordinate;
      const newRow: Square[] = [];

      row.forEach((shortName, posX) => {
        const x = posX as ChessBoardCoordinate;
        const newSquare = new Square(x, y, shortName);

        newRow.push(newSquare);
      });

      this.push(newRow);
    });
  }

  public static getRowFromChessRow(chessRow: ChessSquare[]): Square[] {
    return chessRow.map(Square.getSquareFromChessSquare);
  }

  public static getBoardFromChessBoard(chessBoard: ChessBoard): Board {
    return chessBoard.map(Board.getRowFromChessRow);
  }
};
