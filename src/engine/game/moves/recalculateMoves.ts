import type { ChessGame, ChessSquare } from '~/types';
import { getOppositeColour } from '~/helpers/oppositeColour';
import { getMoveValidator } from './moveValidator';
import { getSquaresByPieceColour } from './helpers';

const recalculatePieceMovesGetter = (game: ChessGame) => {
  if (!game?.board) return () => ({}) as ChessSquare;
  const validateMove = getMoveValidator(game);

  return (square: ChessSquare): ChessSquare => {
    if (square.piece) {
      square.piece.possibleMoves = square.piece?.moves
        .flatMap(validateMove(square));
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
