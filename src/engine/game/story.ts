import type {
  ChessBoard,
  ChessColour,
  ChessPiece,
  ChessStory,
  ChessStoryEntry,
} from '~/types';
import { Board } from '../board';
import { Piece } from '../piece';

export class StoryEntry implements ChessStoryEntry {
  move: number;
  board: Board;
  turn: ChessColour;
  removedPieces: Piece[] = [];

  constructor(
    move: number,
    board: ChessBoard,
    turn: ChessColour,
    removedPieces: ChessPiece[],
  ) {
    this.move = move;
    this.board = new Board(board);
    this.turn = turn;
    this.removedPieces = removedPieces.map(Piece.fromChessPiece);
  }

  public static fromChessStoryEntry({
    move,
    board,
    turn,
    removedPieces,
  }: ChessStoryEntry): StoryEntry {
    return new StoryEntry(
      move,
      board,
      turn,
      removedPieces,
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
    if (initialBoard) this.setNewEntry(initialBoard, 'white', []);
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
    removedPieces: Piece[],
  ) {
    const newEntry = new StoryEntry(
      this.currentMove,
      board,
      turn,
      removedPieces,
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
