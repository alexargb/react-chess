import React, { useEffect, useState } from 'react';
import type { ChessColour, ChessPiece, ChessPieceShortName, ChessSquare } from '~/types';
import { Piece } from '~/components/atoms/piece';
import { SquareMark } from './SquareMark';
import { PromotionList, PromotionListItem, SquareDiv } from './styled';

type SquareProps = {
  square: ChessSquare;
  onClick: (promotingPiece?: ChessPieceShortName) => void,
  onSelectSquare?: (square: ChessSquare) => void,
  promotingSquare?: ChessSquare;
  isPromotionInnerSquare?: boolean;
};

export const Square = ({
  square,
  onClick,
  onSelectSquare,
  promotingSquare,
  isPromotionInnerSquare,
}: SquareProps) => {
  const { piece, colour, marked, selected, lastMovedSquare, promotesFor } = square;
  const [isPromoting, setIsPromoting] = useState(false);

  useEffect(() => {
    if (!marked) setIsPromoting(false);
  }, [marked]);

  useEffect(() => {
    if (promotingSquare !== square) setIsPromoting(false);
  }, [promotingSquare]);

  const clickHandler = () => {
    if (!promotesFor) {
      onClick();
      return;
    }

    setIsPromoting(true);
    onSelectSquare?.(square);
  };

  return (
    <SquareDiv
      $colour={colour}
      $marked={marked}
      $selected={selected}
      $hasPiece={!!piece}
      $isPromoting={isPromoting}
      $isLastMovedSquare={!!lastMovedSquare}
      $isLastMovedPiece={!!piece?.lastMovedPiece}
      onClick={clickHandler}
      role="square"
    >
      {piece && <Piece piece={piece}/>}
      {!piece && marked && <SquareMark />}

      {!isPromotionInnerSquare && !!promotesFor && (
        <PromotionSquares
          visible={!!promotesFor && isPromoting}
          pieceColour={promotesFor || 'white'}
          onClick={onClick}
          isLeftBorderSquare={square.x === 0}
          isRightBorderSquare={square.x === 7}
        />
      )}
    </SquareDiv>
  );
};

// PromotionSquares
type PromotionSquaresProps = {
  pieceColour: ChessColour,
  visible: boolean,
  onClick: (promotingPiece?: ChessPieceShortName) => void,
  isRightBorderSquare: boolean;
  isLeftBorderSquare: boolean;
};

const getPromoterProps = (
  colour: ChessColour,
  pieceShortName: ChessPieceShortName,
  pieceColour: ChessColour,
): SquareProps => ({
  square: {
    colour,
    piece: {
      shortName: pieceShortName,
      colour: pieceColour
    } as ChessPiece,
  } as ChessSquare,
  onClick: () => {},
  isPromotionInnerSquare: true,
});

const PromotionSquares = ({
  pieceColour,
  visible,
  onClick,
  isRightBorderSquare,
  isLeftBorderSquare,
}: PromotionSquaresProps) => (
  <PromotionList
    $visible={visible}
    $isRightBorderSquare={isRightBorderSquare}
    $isLeftBorderSquare={isLeftBorderSquare}
    role="promotion-list"
  >
    {visible && (
      <>
        <PromotionListItem role="promotion-list-item" onClick={() => onClick('q')}>
          <Square {...getPromoterProps('black', 'q', pieceColour)} />
        </PromotionListItem>
        <PromotionListItem role="promotion-list-item" onClick={() => onClick('r')}>
          <Square {...getPromoterProps('white', 'r', pieceColour)} />
        </PromotionListItem>
        <PromotionListItem role="promotion-list-item" onClick={() => onClick('b')}>
          <Square {...getPromoterProps('black', 'b', pieceColour)} />
        </PromotionListItem>
        <PromotionListItem role="promotion-list-item" onClick={() => onClick('n')}>
          <Square {...getPromoterProps('white', 'n', pieceColour)} />
        </PromotionListItem>
      </>
    )}
  </PromotionList>
);
