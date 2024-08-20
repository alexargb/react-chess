import type {
  ChessBoardCoordinate,
  ChessPieceStrictMove,
  ChessPosition,
  ChessSquare,
} from '~/types';
import { getPositionFromMove } from './getPositionFromMove';

type AllPositionsParam = {
  ownPositions: ChessSquare[];
  enemyPositions: ChessSquare[];
};

type BlockedMovesFilterFunction = (move: ChessPieceStrictMove) => ChessPieceStrictMove[];

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
        x: square.x + (xMultiplier * i) as ChessBoardCoordinate,
        y: square.y + (yMultiplier * i) as ChessBoardCoordinate,
      });
    }
  }

  return orderedPositions.concat(final);
};

const getChessPieceStrictMove = (
  square: ChessSquare,
  position: ChessPosition,
): ChessPieceStrictMove => ({
  changeX: position.x - square.x,
  changeY: position.y - square.y,
});

const sameCoordinatesChecker = (a: ChessPosition) => (b: ChessPosition): boolean =>
  a.x === b.x && a.y === b.y;

export const movesFromBlockedMoves = (
  square: ChessSquare,
  allPositions: AllPositionsParam,
): BlockedMovesFilterFunction => (move) => {
  const { ownPositions, enemyPositions } = allPositions;
  const orderedMovePositions = getOrderedMovePositions(square, move);
  const leftMoves: ChessPieceStrictMove[] = [];

  for (let i = 0; i < orderedMovePositions.length; i += 1) {
    const position = orderedMovePositions[i];
    const haveSameCoordinates = sameCoordinatesChecker(position);

    const ownPiece = ownPositions.find(haveSameCoordinates);
    if (!!ownPiece) break;

    leftMoves.push(getChessPieceStrictMove(square, position));

    const enemyPiece = enemyPositions.find(haveSameCoordinates);
    if (!!enemyPiece) break;
  }

  return leftMoves;
};
