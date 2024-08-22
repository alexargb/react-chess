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

    if (initialSquare.piece?.shortName === 'k') {
      const isQueenCastle = initialSquare.x - finalSquare.x > 1;
      const isKingCastle = finalSquare.x - initialSquare.x > 1;
      if (isKingCastle || isQueenCastle) {
        const rookRow = game.board[initialSquare.y];
        const rookSquare = isKingCastle ? rookRow[7] : rookRow[0];
        const rookFinalX = isKingCastle ? initialSquare.x + 1 : initialSquare.x - 1;
        game.board[initialSquare.y][rookFinalX].piece = rookSquare.piece;
        delete rookSquare.piece;
      }
    }

    game.board[finalSquare.y][finalSquare.x].piece = selectedPiece;
    delete game.board[initialSquare.y][initialSquare.x].piece;

    // TODO: review if en passant

    game.turn = getOppositeColour(game.turn);

    callback?.(game);
    return game;
  };
