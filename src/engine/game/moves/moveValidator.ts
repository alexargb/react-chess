import type {
  ChessColour,
  ChessPieceMove,
  ChessPieceStrictMove,
  ChessPosition,
  ChessSquare,
} from '~/types';
import { getOppositeColour } from '../helpers';
import {
  getPositionFromMove,
  movesFromBlockedMoves,
  sameCoordinatesChecker,
  squareHasPieceFromColour,
  strictMovesMapper,
  validateFinalPosition,
} from './helpers';

export type MoveValidatorFunction = (
  square: ChessSquare,
) => (move: ChessPieceMove) => ChessPieceStrictMove[];

const getDestinationSquare = (
  squares: ChessSquare[],
  position: ChessPosition,
): ChessSquare | null => {
  const shareCoordinates = sameCoordinatesChecker(position);
  return squares.find(shareCoordinates) || null;
};

export const getMoveValidator = (
  squareSets: ChessSquare[][],
  ownColour: ChessColour,
): MoveValidatorFunction => {
  const enemyColour = getOppositeColour(ownColour);

  return (square) => {
    const moveToStrictMoves = strictMovesMapper(square);
    const getUnblockedMoves = movesFromBlockedMoves(square, squareSets);

    return (move) => {
      const { conditions } = move;
      const strictMoves = moveToStrictMoves(move)
        .filter(validateFinalPosition(square));
      const unblockedStrictMoves = strictMoves.flatMap(getUnblockedMoves);

      return unblockedStrictMoves.filter((strictMove) => {
        if (!conditions?.length) return true;

        const destinationPosition = getPositionFromMove(square, strictMove);
        const destination = getDestinationSquare(squareSets.flat(), destinationPosition);

        if (conditions.includes('en passant')) {
          // TODO: en passant
        }

        if (
          conditions.includes('eating') &&
          !squareHasPieceFromColour(destination, enemyColour)
        )
          return false;

        if (
          conditions.includes('unblocked') &&
          squareHasPieceFromColour(destination, enemyColour)
        )
          return false;

        if (conditions.includes('unmoved') && square.piece?.hasMoved)
          return false;

        if (conditions.includes('king castle')) {
          // TODO: king castle
          return false;
        }

        if (conditions.includes('queen castle')) {
          // TODO: queen castle
          return false;
        }

        return true;
      });
    };
  };
};
