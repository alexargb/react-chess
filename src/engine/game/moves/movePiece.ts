import type { ChessGame, ChessSquare } from '~/types';
import { getOppositeColour } from '~/helpers/oppositeColour';
import { recalculateMoves } from './recalculateMoves';
import { markJumpedState, removeJumpedState } from './manageJumpedState';

export const movePieceGetter =
  (
    game: ChessGame,
    selectedSquare: ChessSquare,
    callback?: (game?: ChessGame) => void,
  ) =>
  (markedSquare: ChessSquare): ChessGame => {
    if (!game?.board || !selectedSquare) return;

    removeJumpedState(game);
    markJumpedState(selectedSquare, markedSquare);

    const selectedPiece = selectedSquare?.piece;
    if (selectedPiece) selectedPiece.hasMoved = true;

    if (markedSquare.piece) {
      game.removedPieces.push(markedSquare.piece);
    }

    game.board[markedSquare.y][markedSquare.x].piece = selectedPiece;
    delete game.board[selectedSquare.y][selectedSquare.x].piece;

    // TODO: review if castling or en passant

    game.turn = getOppositeColour(game.turn);

    recalculateMoves(game);

    callback?.();
    return game;
  };
