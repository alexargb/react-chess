import type { ChessGame, ChessPieceShortName, ChessSquare } from '~/types';
import { getOppositeColour, jsonDeepCopy } from '../helpers';
import { markJumpedState, removeJumpedState } from './helpers';
import { newBishop, newKnight, newQueen, newRook } from '~/engine/piece';

export type MovePieceFunction = (
  finalSquare: ChessSquare,
  promotesTo?: ChessPieceShortName,
) => ChessGame | null;

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
    originalGame: ChessGame | null,
    initialSquare: ChessSquare | undefined | null,
    shouldDoTheMove: boolean,
  ): MovePieceFunction =>
  (finalSquare, promotesTo) => {
    const game = jsonDeepCopy(originalGame);
    if (!game?.board || !initialSquare) return game;
    
    const selectedPiece = initialSquare?.piece;

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

    // if should do the move
    if (shouldDoTheMove) {
      removeJumpedState(game);
      markJumpedState(initialSquare, finalSquare);
      
      if (selectedPiece) selectedPiece.hasMoved = true;

      if (finalSquare.piece) {
        game.removedPieces.push(finalSquare.piece);
      }

      game.turn = getOppositeColour(game.turn);
    }

    // move
    if (promotesTo) {
      promote(initialSquare, finalSquare, promotesTo);
    } else {
      game.board[finalSquare.y][finalSquare.x].piece = selectedPiece;
      delete game.board[initialSquare.y][initialSquare.x].piece;
    }

    return game;
  };
