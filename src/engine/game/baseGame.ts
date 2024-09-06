import type {
  ChessBoard,
  ChessBoardCoordinate,
  ChessColour,
  ChessGame,
  ChessPieceShortName,
} from '~/types';
import type { Piece } from '../piece';
import { Board } from '../board';
import { Square } from '../square';
import { Story } from './story';
import { getOppositeColour } from './helpers';

let local_id = 1;

export class BaseGame implements ChessGame {
  id: number;
  board: Square[][] = [];
  turn = 'white' as ChessColour;
  selectedSquare: Square | null = null;
  removedPieces: Piece[] = [];
  story: Story;

  public get enemyColour() {
    return getOppositeColour(this.turn);
  }

  public get gameColours() {
    return [this.turn, this.enemyColour];
  }

  public get finished() {
    const ownSquares = this.getSquaresByPieceColour(this.turn);
    return !ownSquares.some((square) => square.hasPossibleMoves());
  }

  constructor(game?: BaseGame | null) {
    if (!game) {
      // BaseGame object from scratch
      this.id = local_id++;
      this.board = new Board();
      this.story = new Story(this.board);
      return;
    }
    // BaseGame object from ChessGame object
    const {
      id,
      board,
      turn,
      selectedSquare,
      removedPieces,
      story,
    } = game;
    this.id = id;
    this.board = this.mapChessBoard(board);
    this.selectedSquare = selectedSquare;
    this.removedPieces = removedPieces;
    this.turn = turn;
    this.story = story;
  }

  public mapChessBoard(board: ChessBoard): Board {
    return board.map((row) => row.map(Square.getSquareFromChessSquare));
  }

  public updateStory() {
    const boardCopy = this.mapChessBoard(this.board)
    this.story.setNewEntry(boardCopy);
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
