import type { ChessBoard, ChessSquare } from '~/types';

export const squareUnselector = (
  board: ChessBoard,
  callback?: () => void,
) => () => {
  if (!board) return;
  board.forEach((row, y) => {
    row.forEach((_, x) => {
      board[y][x].selected = false;
      board[y][x].marked = false;
      delete board[y][x].promotesFor;
    });
  });

  callback?.();
};

export const squareSelector = (
  board: ChessBoard,
  callback?: (square: ChessSquare) => void,
) => {
  const unselectSquare = squareUnselector(board);

  return (square: ChessSquare) => {
    if (!board || !square) return;
    unselectSquare();
  
    const { x, y } = square;
    board[y][x].selected = true;
  
    square.piece?.possibleMoves.forEach((move) => {
      const { changeX, changeY, promotes } = move;
      const newX = x + changeX;
      const newY = y + changeY;
  
      board[newY][newX].marked = true;
      if (promotes) {
        board[newY][newX].promotesFor = square.piece?.colour;
      }
    });
  
    callback?.(square);
  };
};
