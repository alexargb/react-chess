import type {
  ChessColour,
  ChessGame,
} from '~/types';
import { Piece } from '../piece';
import { Board } from '../board';
import { Square } from '../square';
import { Story } from './story';
import { getOppositeColour } from './helpers';

let local_id = 1;

export class BaseGame {
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

  public get enemyColour(): ChessColour {
    return getOppositeColour(this.turn);
  }

  public get gameColours(): ChessColour[] {
    return [this.turn, this.enemyColour];
  }

  public get ownSquares(): Square[] {
    return this.board.getSquaresWithPieceOfColour(this.turn);
  }

  public get enemySquares(): Square[] {
    return this.board.getSquaresWithPieceOfColour(this.enemyColour);
  }

  public get ownKingIsOnCheck(): boolean {
    return this.enemySquares
      .flatMap((square) => square.piece?.possibleMoves || [])
      .some((move) => move.hitsKing);
  }

  constructor(id?: number) {
    this.id = id || (local_id++);
    this.board = id ? Board.getEmptyBoard() : new Board();
    this.story = new Story(!id ? this.board : undefined);
  }

  public static fromChessGame(game: ChessGame, newObject?: BaseGame): BaseGame {
    const {
      id,
      board,
      turn,
      selectedSquare,
      removedPieces,
      story,
    } = game;

    const newBaseGame = newObject || new BaseGame(id);

    newBaseGame.board = Board.fromChessBoard(board);
    newBaseGame.turn = turn;

    if (selectedSquare) newBaseGame.selectedSquare = Square.fromChessSquare(selectedSquare);

    newBaseGame.removedPieces.white = removedPieces.white.map(Piece.fromChessPiece);
    newBaseGame.removedPieces.black = removedPieces.black.map(Piece.fromChessPiece);

    newBaseGame.story = Story.fromChessStory(story);
    return newBaseGame;
  }

  public changeTurn(): BaseGame {
    this.turn = this.enemyColour;
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
