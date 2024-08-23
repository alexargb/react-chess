import styled, { css } from 'styled-components';
import type { ChessColour } from '~/types';
import { getOppositeColour } from '~/engine/game/helpers';

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
  $colour: ChessColour;
};

export const CongratsSpan = styled.span<CongratsSpanProps>`
  font-size: 60px;
  font-weight: bold;
  font-family: cursive;

  ${({ $colour }) => css`
    color: ${$colour};
    text-shadow: 3px 3px 3px ${getOppositeColour($colour)};
  `}
`;
