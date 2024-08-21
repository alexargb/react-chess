import { useState } from 'react';
import type { ChessGame, ChessSquare } from '~/types';
import type { GameContextState } from './types';
import {
  recordUpdater,
  newGame,
  squareSelector,
  squareUnselector,
  movePieceGetter,
  recalculateMoves,
} from '~/engine';

export const useGameState = (): GameContextState => {
  const [record, setRecord] = useState<ChessGame[]>([]);
  const [currentGame, setCurrentGame] = useState<ChessGame>(null);
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null);

  const updateRecord = recordUpdater(record, setRecord);
  const updateGames = (game?: ChessGame) => {
    setCurrentGame(game || currentGame);
    updateRecord(game || currentGame);
  };

  // game initialization
  const createNewGame = (): ChessGame => {
    setSelectedSquare(null);

    const game = newGame();
    updateGames(game);
    return game;
  };

  // square selection
  const selectSquare = squareSelector(
    currentGame?.board,
    (square: ChessSquare) => {
      updateGames();
      setSelectedSquare(square);
    },
  );

  const unselectSquare = squareUnselector(
    currentGame?.board,
    () => {
      updateGames();
      setSelectedSquare(null);
    },
  );

  // square click
  const movePiece = movePieceGetter(currentGame, selectedSquare as ChessSquare, true, () => {
    unselectSquare();
    recalculateMoves(currentGame);
    updateGames();
  });


  const onSquareClick = (square: ChessSquare) => {
    if (currentGame?.board && square.marked && selectedSquare) {
      movePiece(square);
      return;
    }

    const { piece } = square;
    const squareIsSelected = piece?.id === selectedSquare?.piece?.id;
    const pieceIsTurnColour = piece?.colour === currentGame?.turn;

    if (!piece || squareIsSelected || !pieceIsTurnColour) {
      unselectSquare();
      return;
    }
    selectSquare(square);
  };

  return {
    currentGame,
    setCurrentGame,
    record,
    createNewGame,
    onSquareClick,
  };
};
