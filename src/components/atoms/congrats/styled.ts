import styled, { css } from 'styled-components';
import type { ChessFinishWinner } from '~/types';

type CongratsWrapperProps = {
  $visible: boolean;
};

export const CongratsWrapper = styled.div<CongratsWrapperProps>`
  position: absolute;
  overflow: hidden;

  ${({ $visible }) => {
    if ($visible) {
      return css`
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `;
    }
    return css`
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
    `;
  }}

  transition: all 250ms;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: rgba(0, 0, 0, 0.4);
`;

type CongratsSpanProps = {
  $winner?: ChessFinishWinner;
};

const getTextColor = (winner?: ChessFinishWinner): string => {
  switch (winner) {
    case 'black':
    case 'white':
      return winner;
    default:
      return '#999';
  }
};

const getTextShadowColor = (winner?: ChessFinishWinner): string => {
  switch (winner) {
    case 'black':
      return 'white';
    default:
      return 'black';
  }
};

export const CongratsSpan = styled.span<CongratsSpanProps>`
  font-size: 60px;
  font-weight: bold;
  font-family: cursive;

  ${({ $winner }) => css`
    color: ${getTextColor($winner)};
    text-shadow: 3px 3px 3px ${getTextShadowColor($winner)};
  `}
`;
