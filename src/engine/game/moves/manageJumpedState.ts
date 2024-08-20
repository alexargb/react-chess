import type { ChessGame, ChessPiece, ChessSquare } from "~/types";

export const markJumpedState = (
  selectedSquare: ChessSquare,
  markedSquare: ChessSquare,
): ChessPiece | undefined => {
  const selectedPiece = selectedSquare?.piece;

  if (
    selectedPiece?.shortName === "p" &&
    Math.abs(markedSquare.y - selectedSquare.y) === 2
  )
    selectedPiece.pawnJustJumped = true;

  return selectedPiece;
};

export const removeJumpedState = (game: ChessGame): ChessGame => {
  if (!game?.board) return game;

  game.board.forEach((row, y) => {
    row.forEach((_, x) => {
      const square = game.board?.[y][x];
      if (!!square?.piece) {
        square.piece.pawnJustJumped = false;
      }
    });
  });

  return game;
};
