import React, { useState } from 'react';
import type { ChessBoard, ChessPieceShortName, ChessSquare } from '~/types';
import { Square } from '~/components/atoms/square';
import { BoardDiv, RowDiv } from './styled';
import { useGameContext } from '~/hooks';

type BoardProps = {
  board?: ChessBoard;
};

export const Board = ({ board }: BoardProps) => {
  const [promotingSquare, setPromotingSquare] = useState<ChessSquare | undefined>();
  const { onSquareClick } = useGameContext();

  const onSelectSquare = (square: ChessSquare) => {
    setPromotingSquare(square);
  };

  if (!board?.length) return null;
  return (
    <BoardDiv role="board">
      {board.map((row, idx) => (
        <RowDiv key={idx} role="board-row">
          {row.map((square, idx) => {
            const onClick = (promotingPiece?: ChessPieceShortName) =>
              onSquareClick?.(square, promotingPiece);

            return (
              <Square
                key={idx}
                square={square}
                promotingSquare={promotingSquare}
                onClick={onClick}
                onSelectSquare={onSelectSquare}
              />
            );
          })}
        </RowDiv>
      ))}
    </BoardDiv>
  );
};

