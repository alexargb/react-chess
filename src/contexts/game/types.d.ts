import type { Dispatch, SetStateAction, ReactNode } from 'react';
import { ChessGame } from '~/types';

export type GameContextState = {
  currentGame?: ChessGame;
  setCurrentGame?: Dispatch<SetStateAction<ChessGame>>;
  games?: ChessGame[];
};

export type GameProviderProps = {
  children: ReactNode;
};
