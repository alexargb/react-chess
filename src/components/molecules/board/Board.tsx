import React from 'react';
import type { ChessBoard } from '~/types';
import { Square } from '~/components/atoms/square';
import { BoardDiv, RowDiv } from './styled';
import { useGameContext } from '~/hooks';

type BoardProps = {
  board?: ChessBoard;
};

export const Board = ({ board }: BoardProps) => {
  const { onSquareClick } = useGameContext();

  if (!board?.length) return null;
  return (
    <BoardDiv role="board">
      {board.map((row, idx) => (
        <RowDiv key={idx} role="board-row">
          {row.map((square, idx) => {
            const onClick = () => onSquareClick?.(square);

            return (
              <Square key={idx} square={square} onClick={onClick} />
            );
          })}
        </RowDiv>
      ))}
    </BoardDiv>
  );
};

