import type { ChessGame, ChessSquare } from '~/types';
import { recalculateMoves } from './recalculateMoves';

export const movePieceGetter = (
  game: ChessGame,
  selectedSquare: ChessSquare,
  callback?: (game?: ChessGame) => void,
) => (square: ChessSquare) => {
  if (!game?.board || !selectedSquare) return;

  const piece = selectedSquare?.piece;
  if (piece) piece.hasMoved = true;

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
