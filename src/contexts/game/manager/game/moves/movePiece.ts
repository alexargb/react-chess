import type { ChessGame, ChessSquare } from '~/types';
import { recalculateMoves } from './recalculateMoves';
import { removeJumpedState } from './removeJumpedState';

export const movePieceGetter = (
  game: ChessGame,
  selectedSquare: ChessSquare,
  callback?: (game?: ChessGame) => void,
) => (square: ChessSquare) => {
  if (!game?.board || !selectedSquare) return;

  removeJumpedState(game);

  const piece = selectedSquare?.piece;
  if (piece) piece.hasMoved = true;
  if (
    piece?.shortName === 'p' &&
    Math.abs(square.y - selectedSquare.y) === 2
  ) piece.pawnJustJumped = true;

  if (square.piece) {
    game.removedPieces.push(square.piece);
  }

  game.board[square.y][square.x].piece = piece;
  delete game.board[selectedSquare.y][selectedSquare.x].piece;

  // TODO: review if castling or en passant

  game.turn = game.turn === 'white' ? 'black' : 'white';

  recalculateMoves(game);

  callback?.();
};
