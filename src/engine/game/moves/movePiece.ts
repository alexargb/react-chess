import type { ChessGame, ChessSquare } from '~/types';
import { getOppositeColour } from '../helpers';
import { markJumpedState, removeJumpedState } from './helpers';

export const movePieceGetter =
  (
    game: ChessGame,
    initialSquare: ChessSquare,
    finalMove: boolean,
    callback?: (game?: ChessGame) => void,
  ) =>
  (finalSquare: ChessSquare): ChessGame => {
    if (!game?.board || !initialSquare) return;

    if (finalMove) {
      removeJumpedState(game);
      markJumpedState(initialSquare, finalSquare);
    }

    const selectedPiece = initialSquare?.piece;
    if (selectedPiece && finalMove) selectedPiece.hasMoved = true;

    if (finalSquare.piece && finalMove) {
      game.removedPieces.push(finalSquare.piece);
    }

    game.board[finalSquare.y][finalSquare.x].piece = selectedPiece;
    delete game.board[initialSquare.y][initialSquare.x].piece;

    // TODO: review if castling or en passant

    game.turn = getOppositeColour(game.turn);

    callback?.(game);
    return game;
  };
