import { useState } from 'react';
import type { ChessGame, ChessPieceShortName, ChessSquare } from '~/types';
import type { GameContextState } from './types';
import {
  recordUpdater,
  newGame,
  movePieceGetter,
  recalculateMoves,
  unselectGameSquare,
  selectSquare,
} from '~/engine';

export const useGameState = (): GameContextState => {
  const [record, setRecord] = useState<ChessGame[]>([]);
  const [currentGame, setCurrentGame] = useState<ChessGame | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null);

  const getUpdatedRecord = recordUpdater(record);
  const updateGames = (game?: ChessGame | null) => {
    setCurrentGame(game || currentGame);
    // setCurrentGame is not actually necessary for most cases (apart from new game) but
    // I'll leave it anyway
    setRecord(getUpdatedRecord(game || currentGame));
  };

  // game initialization
  const createNewGame = (): ChessGame => {
    setSelectedSquare(null);

    const game = newGame();
    updateGames(game);
    return game;
  };

  // square click
  const movePiece = movePieceGetter(currentGame, currentGame?.selectedSquare, true);

  const onSquareClick = (square: ChessSquare, promotingPiece?: ChessPieceShortName) => {
    if (currentGame?.board && square.marked && currentGame?.selectedSquare) {
      let gameAfterMove = movePiece(square, promotingPiece);
      gameAfterMove = unselectGameSquare(gameAfterMove);
      gameAfterMove = recalculateMoves(gameAfterMove);
      updateGames(gameAfterMove);
      return;
    }

    const { piece } = square;
    const squareIsSelected = piece?.id === selectedSquare?.piece?.id;
    const pieceIsTurnColour = piece?.colour === currentGame?.turn;
    if (!piece || squareIsSelected || !pieceIsTurnColour) {
      updateGames(unselectGameSquare(currentGame));
      return;
    }

    updateGames(selectSquare(currentGame, square));
  };

  return {
    currentGame,
    setCurrentGame,
    record,
    createNewGame,
    onSquareClick,
  };
};
