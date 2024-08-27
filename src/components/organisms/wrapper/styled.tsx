import styled, { css } from 'styled-components';
import { Title } from '~/components/atoms/title';

export const WrapperContainer = styled.div`
  background-color: #444;
  padding: 8px 26px;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const WrapperTitle = styled(Title)`
  background-color: #EAEAEA;

  width: 100vw;
  margin-left: -26px;

  display: flex;
  align-items: center;
`;

export const MenuLink = styled.div`
  transition: all 250ms;
  cursor: pointer;

  &:active {
    background-color: #CCC;
  }
`;

type VisibleContainerProps = {
  $visible: boolean;
};

export const Chevron = styled.div<VisibleContainerProps>`
  font-family: verdana;
  font-size: 16px;
  font-weight: bolder;

  display: flex;
  align-items: center;
  justify-content: space-around;

  overflow: hidden;
  transition: all 350ms;
  ${({ $visible }) => css`
    width: ${$visible ? '16px' : '0'};
    margin: auto ${$visible ? '8px' : '0'};
  `}
`;

export const CurrentViewSpan = styled.div<VisibleContainerProps>`
  display: flex;
  align-items: center;

  overflow: hidden;
  transition: all 350ms;
  ${({ $visible }) => css`
    width: ${$visible ? '200px' : '0'};
  `}
`;
