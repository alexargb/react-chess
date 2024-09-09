import type {
  ChessColour,
  ChessGame,
} from '~/types';
import type { Piece } from '../piece';
import { Board } from '../board';
import { Square } from '../square';
import { Story } from './story';
import { getOppositeColour } from './helpers';

let local_id = 1;

export class BaseGame implements ChessGame {
  id: number;
  board: Board;
  turn = 'white' as ChessColour;
  selectedSquare?: Square;
  removedPieces = {
    white: [] as Piece[],
    black: [] as Piece[],
  };
  story: Story;
  lastMovedPiece?: Piece;
  lastMovedSquare?: Square;

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

  constructor(game?: BaseGame) {
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
    this.board = new Board(board);
    this.selectedSquare = selectedSquare;
    this.removedPieces = removedPieces;
    this.turn = turn;
    this.story = story;
  }

  public changeTurn(): BaseGame {
    this.turn = getOppositeColour(this.turn);
    return this;
  }

  public updateStory(): BaseGame {
    this.story.setNewEntry(
      this.board,
      this.turn,
      this.removedPieces,
      this.lastMovedPiece,
      this.lastMovedSquare,
    );

    return this;
  }

  public unselectSquare(): BaseGame {
    const { board } = this;
    board.forEach((row, y) => {
      row.forEach((_, x) => {
        board[y][x].selected = false;
        board[y][x].marked = false;
        delete board[y][x].promotesFor;
      });
    });

    delete this.selectedSquare;
    return this;
  };

  public selectSquare(square?: Square): BaseGame {
    if (!square) return this;
    this.unselectSquare();
    const { x, y } = square;
    this.selectedSquare = this.board[y][x];

    this.board[y][x].selected = true;

    this.selectedSquare.piece?.possibleMoves.forEach((move) => {
      const { changeX, changeY, promotes } = move;
      const newX = x + changeX;
      const newY = y + changeY;
  
      const finalSquare = this.board[newY][newX];
      finalSquare.marked = true;
      if (promotes) {
        finalSquare.promotesFor = this.selectedSquare?.piece?.colour;
      }
    });

    return this;
  };

  public removeJumpedStates(): BaseGame {
    this.board.forEach((row, y) => {
      row.forEach((_, x) => {
        const square = this.board[y][x];
        if (!!square.piece) {
          square.piece.pawnJustJumped = false;
        }
      });
    });

    return this;
  };

  public removeLastMovedPieceState(): BaseGame {
    const { board } = this;
    board.forEach((row, y) => {
      row.forEach((_, x) => {
        board[y][x].lastMovedSquare = false;

        const square = board[y][x];
        if (square.piece) square.piece.lastMovedPiece = false;
      });
    });
    delete this.lastMovedPiece;
    delete this.lastMovedSquare;

    return this;
  }

  public onPieceMove(
    initialSquare: Square,
    finalSquare: Square,
  ): BaseGame {
    if (!initialSquare.piece) return this;

    initialSquare.markJumpedState(finalSquare);
    this.lastMovedPiece = initialSquare.piece.onPieceMove(initialSquare);
    if (finalSquare.piece) {
      this.removedPieces[this.enemyColour].push(finalSquare.piece);
    }

    this.changeTurn();
    return this;
  }

  public getSquaresByPieceColour(colour: ChessColour): Square[] {
    const filterSquareByPieceColour = (square: Square) => square.hasPieceOfColour(colour);
    const reduceSquaresByPieceColour = (
      squares: Square[],
      row: Square[],
    ): Square[] => squares.concat(row.filter(filterSquareByPieceColour));
  
    return this.board.reduce(reduceSquaresByPieceColour, []);
  }
}
