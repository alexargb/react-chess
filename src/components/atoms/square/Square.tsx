import React from 'react';
import type { ChessSquare } from '~/types';
import { Piece } from '~/components/atoms/piece';
import { SquareMark } from './SquareMark';
import { SquareDiv } from './styled';

type SquareProps = {
  square: ChessSquare;
  onClick: () => void,
};

export const Square = ({ square, onClick }: SquareProps) => {
  const { piece, colour, marked, selected } = square;

  return (
    <SquareDiv
      $colour={colour}
      $marked={marked}
      $selected={selected}
      $hasPiece={!!piece}
      role="square"
      onClick={onClick}
    >
      {piece && <Piece piece={piece}/>}
      {!piece && marked && <SquareMark />}
    </SquareDiv>
  );
};
