import type {
  ChessBoard,
  ChessBoardCoordinate,
  ChessSquare,
} from '~/types';
import { Square } from './square';
import { BASE_BOARD } from './constants';

export class Board extends Array<Square[]> {
  constructor(chessBoard?: ChessBoard) {
    super();

    if (Array.isArray(chessBoard)) {
      const boardValues = Board.fromChessBoard(chessBoard);
      this.fillBoard(boardValues);
      return;
    }

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

  private fillBoard(boardValues: Square[][]) {
    boardValues.forEach((row) => {
      this.push(row);
    });
  }

  private static fromChessRow(chessRow: ChessSquare[]): Square[] {
    return chessRow.map(Square.fromChessSquare);
  }

  private static fromChessBoard(chessBoard: ChessBoard): Square[][] {
    return chessBoard.map(Board.fromChessRow);
  }

  public print(): string {
    return this.map((row) => {
      const squares = row.map((square) => square.print());
      return squares.join('|');
    }).join('\n-----------------------\n');
  }
};
