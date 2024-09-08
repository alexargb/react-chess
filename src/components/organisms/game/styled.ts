import styled, { css } from 'styled-components';

type GameContainerProps = {
  $visible: boolean;
  $hidden: boolean;
};

export const GameContainer = styled.div<GameContainerProps>`
  transition: all 350ms;

  ${({ $visible, $hidden }) => css`
    width: ${$visible ? '448px' : '0'};
    @media screen and (max-width: 500px) {
      width: ${$visible ? '89.5vw' : '0'};
    }
    min-height: ${$visible ? 'fit-content' : '0'};
    height: ${$visible ? '80vh' : '0'};
    margin-top: ${$visible ? '32px' : '0'};


    overflow: ${$hidden ? 'hidden' : 'visible'};
  `}
`;
