import type { ChessGame } from '~/types';

export const gamesUpdater = (
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
