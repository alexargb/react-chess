import styled from 'styled-components';
import { Title } from '~/components/atoms/title';

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

export const GameDiv = styled.div`
  height: fit-content;
`;
