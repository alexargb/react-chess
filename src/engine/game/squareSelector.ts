import type { ChessGame, ChessSquare } from '~/types';
import { jsonDeepCopy } from './helpers';

export const unselectGameSquare = (
  originalGame: ChessGame | null,
): ChessGame | null => {
  const game: ChessGame = jsonDeepCopy(originalGame);
  if (!game?.board) return game;

  const { board } = game;

  board.forEach((row, y) => {
    row.forEach((_, x) => {
      board[y][x].selected = false;
      board[y][x].marked = false;
      delete board[y][x].promotesFor;
    });
  });

  game.selectedSquare = null;
  return game;
};

export const selectSquare = (
  originalGame: ChessGame | null,
  square: ChessSquare,
): ChessGame | null => {
  if (!square) return originalGame;

  let game: ChessGame | null = jsonDeepCopy(originalGame);
  game = unselectGameSquare(game);

  if (!game?.board) return game;
  const { board } = game;

  const { x, y } = square;
  board[y][x].selected = true;

  square.piece?.possibleMoves.forEach((move) => {
    const { changeX, changeY, promotes } = move;
    const newX = x + changeX;
    const newY = y + changeY;

    board[newY][newX].marked = true;
    if (promotes) {
      board[newY][newX].promotesFor = square.piece?.colour;
    }
  });

  game.selectedSquare = square;
  return game;
};
