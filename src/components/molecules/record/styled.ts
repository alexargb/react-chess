import type { ChessColour } from '~/types';
import styled from 'styled-components';
import { List } from '~/components/atoms/list';
import { Title } from '~/components/atoms/title';

type ColourSpanProps = {
  $colour: ChessColour;
};

export const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-top: 16px;
`;

export const RecordTitle = styled(Title)`
  color: #FFF;
  background-color: #46861E;
  border-radius: 4px;
`;

export const RecordList = styled(List)`
  font-weight: bold;
  font-size: 18px;
`;

export const IdSpan = styled.span`
  background-color: #EAEAEA;
  color: #000;
  padding: 0 8px;
  text-align: center;
  font-weight: bolder;
  border-radius: 2px;
  margin-right: 4px;
`;

export const ColourSpan = styled.span<ColourSpanProps>`
  color: ${({ $colour }) => $colour};
  text-decoration: underline;
  font-weight: bolder;
`;
