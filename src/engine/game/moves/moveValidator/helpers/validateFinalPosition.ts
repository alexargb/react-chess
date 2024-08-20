import type { ChessPieceStrictMove, ChessSquare } from "~/types";

export const validateFinalPosition = (initialSquare: ChessSquare) => {
  const { x, y } = initialSquare;

  return (move: ChessPieceStrictMove): boolean => {
    const newX = x + move.changeX;
    const newY = y + move.changeY;

    return newX >= 0 && newY >= 0 && newX <= 7 && newY <= 7;
  };
};
