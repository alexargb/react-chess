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
  overflow: hidden;
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
  max-width: 55px;
  max-height: 55px;
  width: 11vw;
  height: 11vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

type PromotionListProps = {
  $visible: boolean;
  $isRightBorderSquare: boolean;
  $isLeftBorderSquare: boolean;
};

export const PromotionList = styled.div<PromotionListProps>`
  position: absolute;
  top: -9vw;
  left: -1px;
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
    ${$isRightBorderSquare && css`
      margin-left: ${$visible ? '-27vw' : '5vw'};
    `}
    ${$isLeftBorderSquare && css`
      margin-left: ${$visible ? '-5vw' : '5vw'};
    `}
    ${!$isRightBorderSquare && !$isLeftBorderSquare && css`
      margin-left: ${$visible ? '-16.5vw' : '5vw'};
    `}
    border: 1px solid ${$visible ? '#000' : 'transparent'};
    width: ${$visible ? 'calc((11vw + 2px) * 4)' : '0'};
    height: ${$visible ? 'fit-content' : '0'};
  `}
`;

export const PromotionListItem = styled.div`
  height: fit-content;
  & > div {
    border: 1px solid #333;
  }
`;
