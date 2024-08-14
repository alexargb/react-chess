import { useState } from 'react';
import type { ChessGame, ChessSquare } from '~/types';
import type { GameContextState } from '../types';
import { newGame, squareSelector, squareUnselector } from '../manager';

const gamesUpdater = (
  games: ChessGame[],
  setGames: (games: ChessGame[]) => void,
) => (game: ChessGame) => {
  const foundGame = games.find((item) => item?.id === game?.id);
  if (!foundGame) {
    setGames([...games, game]);
    return;
  }
  const idx = games.indexOf(foundGame);
  games[idx] = game;
  setGames(games);
};

export const useGameState = (): GameContextState => {
  const [games, setGames] = useState<ChessGame[]>([]);
  const [currentGame, setCurrentGame] = useState<ChessGame>(null);
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null);

  const updateGames = gamesUpdater(games, setGames);

  // game initialization
  const createNewGame = (): ChessGame => {
    const game = newGame();
    setCurrentGame(game);
    updateGames(game);
    return game;
  };

  // square selection
  const onSquareSelection = (square: ChessSquare) => {
    setCurrentGame(currentGame);
    updateGames(currentGame);
    setSelectedSquare(square);
  };
  const selectSquare = squareSelector(currentGame?.board, onSquareSelection);

  const onPieceUnselection = () => {
    setCurrentGame(currentGame);
    updateGames(currentGame);
    setSelectedSquare(null);
  };
  const unselectSquare = squareUnselector(currentGame?.board, onPieceUnselection);

  // square click
  const onSquareClick = (square: ChessSquare) => {
    // TODO: move if marked

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
    games,
    createNewGame,
    onSquareClick,
  };
};
