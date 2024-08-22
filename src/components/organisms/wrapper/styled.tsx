import styled from 'styled-components';
import { BigTitle } from '~/components/atoms/title';

export const WrapperContainer = styled.div`
  background-color: #444;
  padding: 12px 40px;
  height: 100%;
  width: 100%;
`;

export const WrapperTitle = styled(BigTitle)`
  background-color: #EAEAEA;
  border-radius: 4px;
  border: 1px solid transparent;

  cursor: pointer;

  &:hover {
    border: 1px solid #444;
  }

  &:active {
    background-color: #CCC;
  }
`;
