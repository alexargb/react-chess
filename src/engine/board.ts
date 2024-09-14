import type {
  ChessBoard,
  ChessBoardCoordinate,
  ChessColour,
  ChessSquare,
} from '~/types';
import { Square } from './square';
import { BASE_BOARD } from './constants';

export class Board extends Array<Square[]> {
  constructor(shouldPopulate: boolean = true) {
    super();
    if (!shouldPopulate) return;
    this.fillFromBaseBoard();
  }

  private fillFromBaseBoard() {
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

  private static _fromChessRow(chessRow: ChessSquare[]): Square[] {
    return chessRow.map(Square.fromChessSquare);
  }

  private static _fromChessBoard(chessBoard: ChessBoard): Square[][] {
    return chessBoard.map(Board._fromChessRow);
  }

  public static fromChessBoard(chessBoard: ChessBoard): Board {
    const newBoard = new Board(false);
    const boardValues = Board._fromChessBoard(chessBoard);
    newBoard.fillBoard(boardValues);
    return newBoard;
  }

  public static getEmptyBoard() {
    return new Board(false);
  }

  public getSquaresWithPieceOfColour(colour: ChessColour) {
    return this.flatMap((row) => row.filter(Square.hasPieceOfColour(colour)));
  }

  public print(): string {
    return this.map((row) => {
      const squares = row.map((square) => square.print());
      return squares.join('|');
    }).join('\n-----------------------\n');
  }
};
