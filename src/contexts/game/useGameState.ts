import { useState } from 'react';
import type { ChessGame, ChessPieceShortName } from '~/types';
import type { GameContextState } from './types';
import {
  recordUpdater,
  Game,
  Square,
} from '~/engine';

export const useGameState = (): GameContextState => {
  const [record, setRecord] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | undefined>();

  const getUpdatedRecord = recordUpdater(record);
  const updateGames = (game?: Game) => {
    const newGame = Game.fromChessGame(game || currentGame || new Game());
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

  // story management
  const undo = () => {
    if (!currentGame) return;
    currentGame.undo();
    currentGame.selectSquare(currentGame.selectedSquare);
    updateGames();
  };

  const redo = () => {
    currentGame?.redo();
    updateGames();
  };

  return {
    currentGame,
    setCurrentGame,
    record,
    createNewGame,
    onSquareClick,
    undo,
    redo,
  };
};
