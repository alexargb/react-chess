import styled, { css } from 'styled-components';
import { List } from '~/components/atoms/list';

type MenuListProps = {
  $visible: boolean;
};

export const MenuList = styled(List)<MenuListProps>`
  overflow: hidden;
  transition: all 350ms, height 200ms;

  ${({ $visible }) => css`
    margin-top: ${$visible ? '32px' : '0'};

    min-height: ${$visible ? 'fit-content' : '0'};
    height: ${$visible ? '30vh' : '0'};
  `}
`;
