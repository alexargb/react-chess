import type { Game } from '../game';

export const recordUpdater = (
  record: Game[],
) => (game: Game | null): Game[] => {
  if (!game) return record;

  const foundGame = record.find((item) => item?.id === game?.id);
  if (!foundGame) {
    return record.concat(game);
  }
  const idx = record.indexOf(foundGame);
  record[idx] = game;
  return record;
};
