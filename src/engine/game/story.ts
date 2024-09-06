import type { ChessStory, ChessStoryEntry } from '~/types';
import { Board } from '../board';

export class StoryEntry implements ChessStoryEntry {
  move: number;
  board: Board;

  constructor(move: number, board: Board) {
    this.move = move;
    this.board = board;
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

  constructor(initialBoard: Board) {
    this.setNewEntry(initialBoard);
  }

  public static getStoryFromChessStory(story: ChessStory): Story {
    if (story.entries.length === 0) return new Story(new Board());
    const newStory = new Story([]);
    newStory.entries = story.entries.map((entry, idx) => {
      return new StoryEntry(idx, Board.getBoardFromChessBoard(entry.board));
    });
    newStory.currentMove = story.currentMove;
    return newStory;
  }

  public setNewEntry(board: Board) {
    const newEntry = new StoryEntry(this.currentMove, board);

    const previousEntries = this.entries.slice(0, this.currentMove);
    this.entries = previousEntries.concat(newEntry);

    this.currentMove += 1;
  }

  public undo(): Board {
    if (this.currentMove > 1) {
      this.currentMove -= 1;
    }
    return this.currentEntry.board;
  }

  public redo(): Board {
    if (this.canRedo) {
      this.currentMove += 1;
    }
    return this.currentEntry.board;
  }
}
