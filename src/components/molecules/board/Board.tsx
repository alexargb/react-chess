import React, { useState } from 'react';
import type { ChessPieceShortName, ChessSquare } from '~/types';
import { useGameContext } from '~/hooks';
import { Square } from '~/components/atoms/square';
import { Congrats } from '~/components/atoms/congrats';
import { BoardContainer, RowDiv } from './styled';

export const Board = () => {
  const { currentGame, onSquareClick } = useGameContext();
  const [promotingSquare, setPromotingSquare] = useState<ChessSquare | undefined>();

  if (!currentGame?.board?.length) return null;
  const onSelectSquare = (square: ChessSquare) => {
    setPromotingSquare(square);
  };

  return (
    <BoardContainer role="board">
      {currentGame.board.map((row, idx) => (
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

      {currentGame && <Congrats game={currentGame} />}
    </BoardContainer>
  );
};

