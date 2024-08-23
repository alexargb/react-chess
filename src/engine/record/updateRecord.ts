import type { ChessGame } from '~/types';

export const recordUpdater = (
  games: ChessGame[],
) => (game: ChessGame | null): ChessGame[] => {
  if (!game) return games;

  const foundGame = games.find((item) => item?.id === game?.id);
  if (!foundGame) {
    return games.concat(game);
  }
  const idx = games.indexOf(foundGame);
  games[idx] = game;
  return games;
};
