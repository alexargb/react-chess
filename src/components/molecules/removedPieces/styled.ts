import styled, { css } from 'styled-components';

type RemovedPiecesListProps = {
  $colour: string;
  $showBorder: boolean;
};

export const RemovedPiecesList = styled.ul<RemovedPiecesListProps>`
  padding: 0;
  display: flex;
  height: 10vw;
  width: calc(11vw * 8 - 6px);

  max-height: 40px;
  max-width: calc(55px * 8 - 6px);
  border-radius: 4px;

  background-color: #555;
  ${({ $colour, $showBorder }) => css`
    border: 3px outset ${$showBorder ? $colour : 'transparent'};
  `}
`;

export const RemovedPiecesListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;

  max-width: 32px;
  width: 5.5vw;
  height: 100%;
  border-radius: 50%;
`;
