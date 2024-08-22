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

        const isQueenCastle = conditions.includes('queen castle');
        const isKingCastle = conditions.includes('king castle');
        if (isQueenCastle || isKingCastle) {
          const [ownSquares] = squareSets;
          const rooks = ownSquares.filter(({ piece }) => piece?.shortName === 'r');

          const rookX = isKingCastle ? 7 : 0;
          const rook = rooks.find(({ x }) => x === rookX)?.piece

          return !!rook && !rook.hasMoved;
        }

        return true;
      });
    };
  };
};
