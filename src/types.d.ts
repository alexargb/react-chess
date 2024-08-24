export type ChessBoardCoordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ChessPieceShortName = 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | '-';
export type ChessPieceName = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export type ChessPieceMoveChange = number | 'x';
export type ChessPieceMoveCondition = 'unmoved' | 'unblocked' | 'eating' | 'queen castle' | 'king castle' | 'en passant';

export type ChessPosition = {
  x: ChessBoardCoordinate;
  y: ChessBoardCoordinate;
};

export type ChessColour = 'white' | 'black';

export type ChessPieceMove = {
  changeX: ChessPieceMoveChange;
  changeY: ChessPieceMoveChange;
  conditions?: ChessPieceMoveCondition[];
  eats: boolean;
  enPassants?: boolean;
};

export type ChessPieceStrictMove = {
  changeX: number;
  changeY: number;
  hitsKing?: boolean;
  promotes?: boolean;
};

export type ChessPieceMoveset = ChessPieceMove[];
export type ChessPieceStrictMoveset = ChessPieceStrictMove[];

export type ChessPiece = {
  id: number;
  shortName: ChessPieceShortName;
  colour: ChessColour;
  hasMoved: boolean;
  moves: ChessPieceMoveset;
  possibleMoves: ChessPieceStrictMoveset;
  pawnJustJumped: boolean;
};

export type ChessSquare = ChessPosition & {
  piece?: ChessPiece;
  colour: ChessColour;
  marked: boolean;
  selected: boolean;
  promotesFor?: ChessColour;
};

export type ChessBoard = ChessSquare[][];

export type ChessTimer = {
  white: number;
  black: number;
};

export type ChessGame = {
  id: number;
  board: ChessBoard;
  turn: ChessColour;
  selectedSquare: ChessSquare | null; // TODO: adapt
  timer?: ChessTimer;
  finished: boolean;
  removedPieces: ChessPiece[];
};
