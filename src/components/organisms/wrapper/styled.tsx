import styled from 'styled-components';
import { Title } from '~/components/atoms/title';

export const WrapperContainer = styled.div`
  background-color: #444;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
`;

export const WrapperTitle = styled(Title)`
  background-color: #EAEAEA;
  border-radius: 4px;
  border: 1px solid transparent;

  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;

  &:hover {
    border: 1px solid #444;
  }

  &:active {
    background-color: #CCC;
  }
`;
