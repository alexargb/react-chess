import { Board } from '../Board';
import { Square } from '../Square';
import { Piece } from '../Piece';

export class HistoryEntry implements ChessHistoryEntry {
  move: number;
  board: Board;
  turn: ChessColour;
  removedPieces: ChessGameRemovedPieces = {
    white: [],
    black: [],
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

  public static fromChessHistoryEntry({
    move,
    board,
    turn,
    removedPieces,
    lastMovedPiece,
    lastMovedSquare,
  }: ChessHistoryEntry): HistoryEntry {
    return new HistoryEntry(
      move,
      board,
      turn,
      removedPieces,
      lastMovedPiece,
      lastMovedSquare,
    );
  }
};

export class History implements ChessHistory {
  currentMove: number = 0;
  entries: HistoryEntry[] = [];

  public get canRedo(): boolean {
    return this.currentMove < this.entries.length;
  }
  public get canUndo(): boolean {
    return this.currentMove > 1;
  }
  private get currentEntry(): HistoryEntry {
    return this.entries[this.currentMove - 1];
  }

  constructor(initialBoard?: Board) {
    if (initialBoard) this.setNewEntry(initialBoard, 'white', { white: [], black: [] });
  }

  public static fromChessHistory({ entries, currentMove }: ChessHistory): History {
    if (entries.length === 0) return new History(new Board());

    const newHistory = new History();
    newHistory.currentMove = currentMove;
    newHistory.entries = entries.map(HistoryEntry.fromChessHistoryEntry);

    return newHistory;
  }

  public setNewEntry(
    board: Board,
    turn: ChessColour,
    removedPieces: { white: Piece[], black: Piece[] },
    lastMovedPiece?: Piece,
    lastMovedSquare?: Square,
  ) {
    const newEntry = new HistoryEntry(
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

  public undo(): HistoryEntry {
    if (this.canUndo) this.currentMove -= 1;
    return this.currentEntry;
  }

  public redo(): HistoryEntry {
    if (this.canRedo) this.currentMove += 1;
    return this.currentEntry;
  }
}
