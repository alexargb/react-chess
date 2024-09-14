import type {
  ChessBoard,
  ChessColour,
  ChessPiece,
  ChessSquare,
  ChessStory,
  ChessStoryEntry,
} from '~/types';
import { Board } from '../board';
import { Square } from '../square';
import { Piece } from '../piece';

export class StoryEntry implements ChessStoryEntry {
  move: number;
  board: Board;
  turn: ChessColour;
  removedPieces: { white: Piece[], black: Piece[] } = {
    white: [] as Piece[],
    black: [] as Piece[],
  };
  lastMovedPiece?: Piece;
  lastMovedSquare?: Square;

  constructor(
    move: number,
    board: ChessBoard,
    turn: ChessColour,
    removedPieces: { white: ChessPiece[], black: ChessPiece[] },
    lastMovedPiece?: ChessPiece,
    lastMovedSquare?: ChessSquare,
  ) {
    this.move = move;
    this.board = Board.fromChessBoard(board);
    this.turn = turn;
    this.removedPieces.white = removedPieces.white.map(Piece.fromChessPiece);
    this.removedPieces.black = removedPieces.black.map(Piece.fromChessPiece);
    if (lastMovedPiece && lastMovedSquare) {
      this.lastMovedPiece = Piece.fromChessPiece(lastMovedPiece);
      this.lastMovedSquare = Square.fromChessSquare(lastMovedSquare);
    }
  }

  public static fromChessStoryEntry({
    move,
    board,
    turn,
    removedPieces,
    lastMovedPiece,
    lastMovedSquare,
  }: ChessStoryEntry): StoryEntry {
    return new StoryEntry(
      move,
      board,
      turn,
      removedPieces,
      lastMovedPiece,
      lastMovedSquare,
    );
  }
};

export class Story implements ChessStory {
  currentMove: number = 0;
  entries: StoryEntry[] = [];

  public get canRedo(): boolean {
    return this.currentMove < this.entries.length;
  }
  public get canUndo(): boolean {
    return this.currentMove > 1;
  }
  private get currentEntry(): StoryEntry {
    return this.entries[this.currentMove - 1];
  }

  constructor(initialBoard?: Board) {
    if (initialBoard) this.setNewEntry(initialBoard, 'white', { white: [], black: [] });
  }

  public static fromChessStory({ entries, currentMove }: ChessStory): Story {
    if (entries.length === 0) return new Story(new Board());

    const newStory = new Story();
    newStory.currentMove = currentMove;
    newStory.entries = entries.map(StoryEntry.fromChessStoryEntry);

    return newStory;
  }

  public setNewEntry(
    board: Board,
    turn: ChessColour,
    removedPieces: { white: Piece[], black: Piece[] },
    lastMovedPiece?: Piece,
    lastMovedSquare?: Square,
  ) {
    const newEntry = new StoryEntry(
      this.currentMove,
      board,
      turn,
      removedPieces,
      lastMovedPiece,
      lastMovedSquare,
    );

    const previousEntries = this.entries.slice(0, this.currentMove);
    this.entries = previousEntries.concat(newEntry);

    this.currentMove += 1;
  }

  public undo(): StoryEntry {
    if (this.canUndo) this.currentMove -= 1;
    return this.currentEntry;
  }

  public redo(): StoryEntry {
    if (this.canRedo) this.currentMove += 1;
    return this.currentEntry;
  }
}
