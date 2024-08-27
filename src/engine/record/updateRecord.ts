import { Game } from "../game";

export const recordUpdater = (
  games: Game[],
) => (game: Game | null): Game[] => {
  if (!game) return games;

  const foundGame = games.find((item) => item?.id === game?.id);
  if (!foundGame) {
    return games.concat(game);
  }
  const idx = games.indexOf(foundGame);
  games[idx] = game;
  return games;
};
