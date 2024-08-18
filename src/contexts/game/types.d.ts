import type { ChessGame, ChessSquare } from '~/types';

export type GameContextState = {
  currentGame?: ChessGame;
  setCurrentGame?: (game: ChessGame) => void;
  record: ChessGame[];
  createNewGame: () => ChessGame;
  onSquareClick?: (square: ChessSquare) => void,
  isPieceSelected?: boolean,
};

export type GameProviderProps = {
  children: ReactNode;
};
