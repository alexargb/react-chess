import type { ChessColour } from '~/types';
import styled, { css } from 'styled-components';

type SquareDivProps = {
  $colour: ChessColour;
  $marked: boolean;
  $selected: boolean;
  $hasPiece: boolean;
  $isPromoting: boolean;
  $isLastMovedSquare: boolean;
  $isLastMovedPiece: boolean;
};

export const SquareDiv = styled.div<SquareDivProps>`
  position: relative;
  cursor: pointer;
  background-color: ${({
    $colour,
    $selected,
    $marked,
    $hasPiece,
    $isPromoting,
    $isLastMovedSquare,
    $isLastMovedPiece,
  }) => {
    if ($selected) {
      return $colour === 'white' ? '#B9BF4C' : '#979C3E';
    }
    if ($isPromoting) {
      return '#555599';
    }
    if ($marked && $hasPiece) {
      return '#EE7373';
    }
    if ($isLastMovedSquare || $isLastMovedPiece) {
      return $colour === 'white' ? '#E3DE58' : '#C3BF4B';
    }
    return $colour === 'white' ? '#FFE9D6' : '#46861E';
  }};
  max-width: 55px;
  max-height: 55px;
  width: 11vw;
  height: 11vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 0.5px solid #444;

  svg[role=piece] {
    max-width: 55px;
    max-height: 55px;
  }
`;

type PromotionListProps = {
  $visible: boolean;
  $isRightBorderSquare: boolean;
  $isLeftBorderSquare: boolean;
};

export const PromotionList = styled.div<PromotionListProps>`
  position: absolute;
  z-index: 1000;

  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #444;

  border-radius: 4px;
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  overflow: hidden;
  transition: all 200ms;

  ${({ $visible, $isRightBorderSquare, $isLeftBorderSquare }) => css`
    top: -50px;
    left: -1px;
    ${$isRightBorderSquare && css`
      margin-left: ${$visible ? '-143px' : '26px'};
    `}
    ${$isLeftBorderSquare && css`
      margin-left: ${$visible ? '-26px' : '26px'};
    `}
    ${!$isRightBorderSquare && !$isLeftBorderSquare && css`
      margin-left: ${$visible ? '-86px' : '26px'};
    `}

    border: ${$visible ? '1px solid black' : 'none'};

    height: ${$visible ? 'fit-content' : '0'};
    width: ${$visible ? 'calc((55px + 2px) * 4)' : '0'};

    @media screen and (max-width: 500px) {
      top: -9vw;
      left: -1px;
      ${$isRightBorderSquare && css`
        margin-left: ${$visible ? '-29vw' : '5vw'};
      `}
      ${$isLeftBorderSquare && css`
        margin-left: ${$visible ? '-5vw' : '5vw'};
      `}
      ${!$isRightBorderSquare && !$isLeftBorderSquare && css`
        margin-left: ${$visible ? '-17.5vw' : '5vw'};
      `}
      width: ${$visible ? 'calc((11vw + 2px) * 4)' : '0'};
    }
  `}
`;

export const PromotionListItem = styled.div`
  height: fit-content;
  & > div {
    border: 1px solid #333;
  }
`;
