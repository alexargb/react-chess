import type { ChessGame, ChessPieceShortName, ChessSquare } from '~/types';

export type GameContextState = {
  currentGame?: ChessGame;
  setCurrentGame?: (game: ChessGame) => void;
  record: ChessGame[];
  createNewGame: () => ChessGame;
  onSquareClick?: (square: ChessSquare, promotingPiece?: ChessPieceShortName) => void,
  isPieceSelected?: boolean,
};

export type GameProviderProps = {
  children: ReactNode;
};
