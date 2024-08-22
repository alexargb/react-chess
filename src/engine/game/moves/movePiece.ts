import type { ChessGame, ChessPieceShortName, ChessSquare } from '~/types';
import { getOppositeColour } from '../helpers';
import { markJumpedState, removeJumpedState } from './helpers';
import { newBishop, newKnight, newQueen, newRook } from '~/engine/piece';

const squareHasPawn = (square: ChessSquare) => square.piece?.shortName === 'p';

const promote = (
  initialSquare: ChessSquare,
  finalSquare: ChessSquare,
  promotesTo: ChessPieceShortName,
) => {
  const id = initialSquare.piece?.id;
  const colour = initialSquare.piece?.colour;
  if (!id || !colour) return;

  switch (promotesTo) {
    case 'n':
      finalSquare.piece = newKnight(id, colour);
      break;
    case 'b':
      finalSquare.piece = newBishop(id, colour);
      break;
    case 'r':
      finalSquare.piece = newRook(id, colour);
      break;
    case 'q':
      finalSquare.piece = newQueen(id, colour);
      break;
    default:
  }

  if (finalSquare.piece) finalSquare.piece.hasMoved = true;
  delete initialSquare.piece;
};

export const movePieceGetter =
  (
    game: ChessGame,
    initialSquare: ChessSquare,
    finalMove: boolean,
    callback?: (game?: ChessGame) => void,
  ) =>
  (finalSquare: ChessSquare, promotesTo?: ChessPieceShortName): ChessGame => {
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

    // castling
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

    // en passant
    if (
      squareHasPawn(initialSquare) &&
      finalSquare.x !== initialSquare.x &&
      !squareHasPawn(finalSquare)
    ) {
      const sidePawnSquare = game.board[initialSquare.y][finalSquare.x];
      delete sidePawnSquare.piece;
    }

    if (promotesTo) {
      promote(initialSquare, finalSquare, promotesTo);
    } else {
      game.board[finalSquare.y][finalSquare.x].piece = selectedPiece;
      delete game.board[initialSquare.y][initialSquare.x].piece;
    }

    game.turn = getOppositeColour(game.turn);

    callback?.(game);
    return game;
  };
