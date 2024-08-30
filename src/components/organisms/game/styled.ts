import styled, { css } from 'styled-components';
import { Title } from '~/components/atoms/title';

type GameDivProps = {
  $visible: boolean;
};

export const GameDiv = styled.div<GameDivProps>`
  transition: all 350ms;

  ${({ $visible }) => css`
    width: ${$visible ? '86.6vw' : '0'};
    min-height: ${$visible ? 'fit-content' : '0'};
    height: ${$visible ? '80vh' : '0'};
    overflow: ${$visible ? 'visible' : 'hidden'};
    margin-top: ${$visible ? '32px' : '0'};
  `}
`;
