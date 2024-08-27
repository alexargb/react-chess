import styled, { css } from 'styled-components';
import { Title } from '~/components/atoms/title';

type GameDivProps = {
  $visible: boolean;
};

export const GameDiv = styled.div<GameDivProps>`
  overflow: hidden;
  transition: all 350ms;

  ${({ $visible }) => css`
    width: ${$visible ? '100vw' : '0'};
    min-height: ${$visible ? 'fit-content' : '0'};
    height: ${$visible ? '80vh' : '0'};
  `}
`;

export const GameTitle = styled(Title)`
  color: #FFF;
  background-color: #46861E;
  padding: 8px 8px;
  margin-top: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ColourSpan = styled.span`
  margin-left: 12px;
  margin-bottom: -4px;
  margin-right: 6px;
`;
