type ChessBoardCoordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ChessPieceShortName = 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | '-';
type ChessPieceName = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

type ChessPieceMoveChange = number | 'x';
type ChessPieceMoveCondition = 'unmoved' | 'unblocked' | 'eating' | 'queen castle' | 'king castle' | 'en passant';

type ChessPosition = {
  x: ChessBoardCoordinate;
  y: ChessBoardCoordinate;
};

type ChessColour = 'white' | 'black';

type ChessFinishWinner = ChessColour | 'stalemate';

type ChessPieceMove = {
  changeX: ChessPieceMoveChange;
  changeY: ChessPieceMoveChange;
  conditions?: ChessPieceMoveCondition[];
  eats: boolean;
  enPassants?: boolean;
};

type ChessPieceStrictMove = {
  changeX: number;
  changeY: number;
  hitsKing?: boolean;
  promotes?: boolean;
};

type ChessPieceMoveset = ChessPieceMove[];
type ChessPieceStrictMoveset = ChessPieceStrictMove[];

type ChessPiece = {
  id: number;
  shortName: ChessPieceShortName;
  colour: ChessColour;
  hasMoved: boolean;
  moves: ChessPieceMoveset;
  possibleMoves: ChessPieceStrictMoveset;
  pawnJustJumped: boolean;
  lastMovedPiece?: boolean;
  previousPosition?: ChessPosition;
};

type ChessSquare = ChessPosition & {
  piece?: ChessPiece;
  colour: ChessColour;
  marked: boolean;
  selected: boolean;
  promotesFor?: ChessColour;
  lastMovedSquare?: boolean;
};

type ChessBoard = ChessSquare[][];
type ChessHistoryEntry = {
  move: number;
  board: ChessBoard;
  turn: ChessColour;
  removedPieces: {
    white: ChessPiece[];
    black: ChessPiece[];
  };
  lastMovedPiece?: ChessPiece;
  lastMovedSquare?: ChessSquare;
};
type ChessHistory = {
  currentMove: number;
  entries: ChessHistoryEntry[];
};

type ChessTimer = {
  white: number;
  black: number;
};

type ChessGameRemovedPieces = Record<ChessColour, Piece[]>;

type BaseChessGame = {
  id: number;
  board: Board;
  turn: ChessColour;
  selectedSquare?: Square;
  removedPieces: ChessGameRemovedPieces;
  history: ChessHistory;
  lastMovedPiece?: Piece;
  lastMovedSquare?: Square;
};

type ChessGame = BaseChessGame & {
  timer?: ChessTimer;
  finished: boolean;
  finishWinner: ChessFinishWinner | null;
};
