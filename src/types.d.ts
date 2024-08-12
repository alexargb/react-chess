export type ChessBoardCoordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ChessPosition = {
  x: ChessBoardCoordinate;
  y: ChessBoardCoordinate;
};

export type ChessColour = 'white' | 'black';

export type ChessPieceMove = {
  changeX: number;
  changeY: number;
  symmetric: boolean;
};

export type ChessPieceMoveset = ChessPieceMove[];

export type ChessPiece = {
  id: number;
  image: string; // TODO: define if URL or actual image
  moves: ChessPieceMoveset;
  posibleMoves: ChessPieceMoveset;
  position?: ChessPosition;
  colour: ChessColour;
};

export type ChessSquare = ChessPosition & {
  piece?: ChessPiece;
  colour: ChessColour;
};

export type ChessBoard = ChessSquare[][] | null;

export type ChessTimer = {
  white: number;
  black: number;
};

export type ChessGame = {
  id: number;
  board: ChessBoard;
  turn: ChessColour;
  timer?: ChessTimer;
  finished: boolean;
} | null;
