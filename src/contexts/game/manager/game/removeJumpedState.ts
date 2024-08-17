import type { ChessGame } from '~/types';

export const removeJumpedState = (game: ChessGame): ChessGame => {
  if (!game?.board) return game;

  game.board.forEach((row, y) => {
    row.forEach((_, x) => {
      const square = game.board?.[y][x];
      if (!!square?.piece) {
        square.piece.pawnJustJumped = false;
      };
    });
  });

  return game;
};
