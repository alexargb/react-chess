import type {
  ChessBoardCoordinate,
  ChessColour,
  ChessGame,
  ChessPieceShortName,
} from '~/types';
import { BASE_BOARD } from '../constants';
import { Square } from '../square';
import { Piece } from '../piece';
import { getOppositeColour } from './helpers';

let local_id = 1;

export class BaseGame implements ChessGame {
  id: number;
  board: Square[][] = [];
  turn = 'white' as ChessColour;
  selectedSquare: Square | null = null;
  removedPieces: Piece[] = [];

  get enemyColour() {
    return getOppositeColour(this.turn);
  }

  get gameColours() {
    return [this.turn, this.enemyColour];
  }

  get finished() {
    const ownSquares = this.getSquaresByPieceColour(this.turn);
    return !ownSquares.some((square) => square.hasPossibleMoves());
  }

  constructor(game?: BaseGame | null) {
    if (!game) {
      // BaseGame object from scratch
      this.id = local_id++;
      this.board = this.newBoard();
      return;
    }
    // BaseGame object from ChessGame object
    const {
      id,
      board,
      turn,
      selectedSquare,
    } = game;
    this.id = id;
    this.board = board.map((row) => row.map(Square.getSquareFromChessSquare));
    this.selectedSquare = selectedSquare;
    this.turn = turn;
  }

  private newBoard(): Square[][] {
    return BASE_BOARD.map((row, posY) => {
      const y = posY as ChessBoardCoordinate;

      return row.map((shortName, posX) => {
        const x = posX as ChessBoardCoordinate;

        return new Square(x, y, shortName as ChessPieceShortName);
      });
    });
  }

  public unselectSquare() {
    const { board } = this;
    board.forEach((row, y) => {
      row.forEach((_, x) => {
        board[y][x].selected = false;
        board[y][x].marked = false;
        delete board[y][x].promotesFor;
      });
    });
  
    this.selectedSquare = null;
  };

  public selectSquare(square: Square) {
    this.unselectSquare();
    this.selectedSquare = square;

    const { x, y } = square;
    this.board[y][x].selected = true;

    square.piece?.possibleMoves.forEach((move) => {
      const { changeX, changeY, promotes } = move;
      const newX = x + changeX;
      const newY = y + changeY;
  
      const finalSquare = this.board[newY][newX];
      finalSquare.marked = true;
      if (promotes) {
        finalSquare.promotesFor = square.piece?.colour;
      }
    });
  };

  public removeJumpedStates() {
    this.board.forEach((row, y) => {
      row.forEach((_, x) => {
        const square = this.board[y][x];
        if (!!square.piece) {
          square.piece.pawnJustJumped = false;
        }
      });
    });
  };

  public getSquaresByPieceColour(colour: ChessColour): Square[] {
    const filterSquareByPieceColour = (square: Square) => square.hasPieceOfColour(colour);
    const reduceSquaresByPieceColour = (
      squares: Square[],
      row: Square[],
    ): Square[] => squares.concat(row.filter(filterSquareByPieceColour));
  
    return this.board.reduce(reduceSquaresByPieceColour, []);
  }
}
