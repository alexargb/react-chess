import type { ChessGame, ChessSquare } from '~/types';
import { getMoveValidator } from './moveValidator';

const recalculatePieceMovesGetter = (game: ChessGame) => {
  if (!game?.board) return () => ({} as ChessSquare);
  const validateMove = getMoveValidator(game);

  return (square: ChessSquare): ChessSquare => {
    if (square.piece) {
      square.piece.possibleMoves = square.piece?.moves
        .flatMap(validateMove(square))
        .filter((move) => !!move);
    }
    return square;
  };
};

export const recalculateMoves = (game: ChessGame): ChessGame => {
  if (!game?.board) return;
  const { board } = game;
  const recalculatePieceMoves = recalculatePieceMovesGetter(game);

  board.forEach((row, y) => {
    row.forEach((_, x) => {
      board[y][x] = recalculatePieceMoves(board[y][x]);
    });
  });

  return game;
};
