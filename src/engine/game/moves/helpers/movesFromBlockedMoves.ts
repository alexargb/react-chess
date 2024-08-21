import type {
  ChessBoardCoordinate,
  ChessPieceStrictMove,
  ChessPosition,
  ChessSquare,
} from '~/types';
import { getPositionFromMove } from './positionFromMove';
import { sameCoordinatesChecker } from './sameCoordinatesChecker';
import { getChessPieceStrictMove } from './chessPieceStrictMove';

type BlockedMovesFilterFunction = (
  move: ChessPieceStrictMove,
) => ChessPieceStrictMove[];

const getOrderedMovePositions = (
  square: ChessSquare,
  move: ChessPieceStrictMove,
): ChessPosition[] => {
  if (move.changeX === 0 && move.changeY === 0) return [];
  const orderedPositions: ChessPosition[] = [];
  const final = getPositionFromMove(square, move);

  if (move.changeY === 0) {
    // horizontal
    const xSummator = square.x <= final.x ? 1 : -1;
    for (let x = square.x + xSummator; x !== final.x; x += xSummator) {
      orderedPositions.push({
        x: x as ChessBoardCoordinate,
        y: square.y,
      });
    }
  } else if (move.changeX === 0) {
    // vertical
    const ySummator = square.y <= final.y ? 1 : -1;
    for (let y = square.y + ySummator; y !== final.y; y += ySummator) {
      orderedPositions.push({
        x: square.x,
        y: y as ChessBoardCoordinate,
      });
    }
  } else if (Math.abs(move.changeX) === Math.abs(move.changeY)) {
    // diagonal
    const xMultiplier = square.x <= final.x ? 1 : -1;
    const yMultiplier = square.y <= final.y ? 1 : -1;
    for (let i = 1; i < Math.abs(move.changeX); i += 1) {
      orderedPositions.push({
        x: (square.x + xMultiplier * i) as ChessBoardCoordinate,
        y: (square.y + yMultiplier * i) as ChessBoardCoordinate,
      });
    }
  }

  return orderedPositions.concat(final);
};

/**
 * Higher order function.
 * The returning mapping function, starting from a single
 * ChessPieceStrictMove with max scope inside the board,
 * returns an Array of ChessPieceStrictMove where the last
 * move of each sequence is or:
 * - Before a border limit
 * - Before an own piece
 * - At an enemy piece
 * @param square The initial square from which the moves start, with its corresponding inner piece
 * @param squareSets Sets of ChessSquares with thie format: [ownSquares, enemySquares]
 * @returns The corresponding mapping function
 */
export const movesFromBlockedMoves =
  (
    square: ChessSquare,
    squareSets: ChessSquare[][],
  ): BlockedMovesFilterFunction => {
    const [ownSquares, enemySquares] = squareSets;

    return (move) => {
      const orderedMovePositions = getOrderedMovePositions(square, move);
      const moves: ChessPieceStrictMove[] = [];
  
      for (let i = 0; i < orderedMovePositions.length; i += 1) {
        const position = orderedMovePositions[i];
        const shareCoordinates = sameCoordinatesChecker(position);
  
        const ownSquare = ownSquares.find(shareCoordinates);
        if (!!ownSquare) break;
  
        const enemySquare = enemySquares.find(shareCoordinates);
  
        const strictMove = getChessPieceStrictMove(square, position, enemySquare);
        moves.push(strictMove);

        if (!!enemySquare) break;
      }
  
      return moves;
    };
  }
