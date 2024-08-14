import type { ChessColour } from '~/types';
import styled from 'styled-components';

type SquareDivProps = {
  $colour: ChessColour;
  $marked: boolean;
  $selected: boolean;
  $hasPiece: boolean;
};

export const SquareDiv = styled.div<SquareDivProps>`
  cursor: pointer;
  background-color: ${({ $colour, $selected, $marked, $hasPiece }) => {
    if ($selected) {
      return $colour === 'white' ? '#DDC7B4' : '#246400';
    }
    if ($marked && $hasPiece) {
      return '#EE7373';
    }
    return $colour === 'white' ? '#FFE9D6' : '#46861E';
  }};
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
