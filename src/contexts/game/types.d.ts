import { Game, Square } from '~/engine';

export type OnSquareClickFunction = (square: Square, promotingPiece?: ChessPieceShortName) => void;

export type GameContextState = {
  currentGame?: Game;
  undo?: () => void;
  redo?: () => void;
  setCurrentGame?: (game: Game) => void;
  record: Game[];
  createNewGame: () => void;
  onSquareClick?: OnSquareClickFunction,
  isPieceSelected?: boolean,
};

export type GameProviderProps = {
  children: ReactNode;
};