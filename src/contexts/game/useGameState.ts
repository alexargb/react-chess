import { useState } from 'react';
import type { ChessPieceShortName } from '~/types';
import type { GameContextState } from './types';
import {
  recordUpdater,
  Game,
  Square,
} from '~/engine';

export const useGameState = (): GameContextState => {
  const [record, setRecord] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const getUpdatedRecord = recordUpdater(record);
  const updateGames = (game?: Game) => {
    const newGame = new Game(game || currentGame);
    setCurrentGame(newGame);
    setRecord(getUpdatedRecord(newGame));
  };

  // game initialization
  const createNewGame = () => {
    updateGames(new Game());
  };

  // square click
  const onSquareClick = (square: Square, promotingPiece?: ChessPieceShortName) => {
    if (!!currentGame && square.marked && currentGame?.selectedSquare) {
      currentGame.movePiece(currentGame.selectedSquare, square, true, promotingPiece);
      updateGames();
      return;
    }

    const { piece } = square;
    const squareIsSelected = piece?.id === currentGame?.selectedSquare?.piece?.id;
    const pieceIsTurnColour = piece?.colour === currentGame?.turn;
    if (!piece || squareIsSelected || !pieceIsTurnColour) {
      currentGame?.unselectSquare();
      updateGames();
      return;
    }

    currentGame?.selectSquare(square);
    updateGames();
  };

  return {
    currentGame,
    setCurrentGame,
    record,
    createNewGame,
    onSquareClick,
  };
};
