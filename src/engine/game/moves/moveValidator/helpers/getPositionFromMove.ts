import type {
  ChessBoardCoordinate,
  ChessPieceStrictMove,
  ChessPosition,
  ChessSquare,
} from "~/types";

export const getPositionFromMove = (
  square: ChessSquare,
  move: ChessPieceStrictMove,
): ChessPosition => ({
  x: (square.x + move.changeX) as ChessBoardCoordinate,
  y: (square.y + move.changeY) as ChessBoardCoordinate,
});
