import type { ChessColour } from '~/types';
import styled, { css } from 'styled-components';
import { List } from '~/components/atoms/list';

type RecordWrapperProps = {
  $visible: boolean;
};

type ColourSpanProps = {
  $colour: ChessColour;
};

export const RecordWrapper = styled.div<RecordWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  
  overflow: hidden;
  transition: all 350ms;

  ${({ $visible }) => css`
    margin-top: ${$visible ? '16px' : '0'};

    min-height: ${$visible ? 'fit-content' : '0'};
    height: ${$visible ? '80vh' : '0'};
  `}
`;

export const RecordList = styled(List)`
  font-size: 18px;
  margin-top: 16px;
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
