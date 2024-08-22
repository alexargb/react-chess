import type { ChessColour } from '~/types';
import styled, { css } from 'styled-components';
import { List, ListItem } from '~/components/atoms/list';

type SquareDivProps = {
  $colour: ChessColour;
  $marked: boolean;
  $selected: boolean;
  $hasPiece: boolean;
  $isPromoting: boolean;
};

export const SquareDiv = styled.div<SquareDivProps>`
  position: relative;
  cursor: pointer;
  background-color: ${({ $colour, $selected, $marked, $hasPiece, $isPromoting }) => {
    if ($selected) {
      return $colour === 'white' ? '#DDC7B4' : '#246400';
    }
    if ($isPromoting) {
      return '#555599';
    }
    if ($marked && $hasPiece) {
      return '#EE7373';
    }
    return $colour === 'white' ? '#FFE9D6' : '#46861E';
  }};
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid transparent;
`;

type PromotionListProps = {
  $visible: boolean;
  $isRightBorderSquare: boolean;
  $isLeftBorderSquare: boolean;
};

export const PromotionList = styled.div<PromotionListProps>`
  position: absolute;
  top: -40px;
  left: -1px;
  z-index: 1000;

  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

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
    ${$isRightBorderSquare && css`
      margin-left: ${$visible ? '-110px' : '22px'};
    `}
    ${$isLeftBorderSquare && css`
      margin-left: ${$visible ? '-30px' : '22px'};
    `}
    ${!$isRightBorderSquare && !$isLeftBorderSquare && css`
      margin-left: ${$visible ? '-70px' : '22px'};
    `}
    border: 1px solid ${$visible ? '#000' : 'transparent'};
    width: ${$visible ? 'calc(47px * 4)' : '0'};
    height: ${$visible ? 'fit-content' : '0'};
  `}
`;

export const PromotionListItem = styled.div`
  height: fit-content;
  & > div {
    border: 1px solid #333;
  }
`;
