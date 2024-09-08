import styled, { css } from 'styled-components';

type SideArrowContainerProps = {
  $disabled: boolean;
};

export const SideArrowContainer = styled.div<SideArrowContainerProps>`
  border: 1px solid #AAA;
  background-color: #555;

  ${({ $disabled }) => !$disabled && css`
    &:hover {
      background-color: #444;

      &:active {
        background-color: #46861E;
      }
    }
  `}
`;
