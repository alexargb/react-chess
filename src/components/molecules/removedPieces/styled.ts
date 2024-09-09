import styled, { css } from 'styled-components';

type RemovedPiecesListProps = {
  $colour: string;
  $showBorder: boolean;
};

export const RemovedPiecesList = styled.ul<RemovedPiecesListProps>`
  padding: 0;
  display: flex;
  height: 10vw;
  width: calc(11vw * 8 - 6px + 8px);
  overflow-y: scroll;

  max-height: 40px;
  max-width: calc(55px * 8 - 6px + 8px);
  border-radius: 4px;

  background-color: #555;
  ${({ $colour, $showBorder }) => css`
    border: 3px outset ${$showBorder ? $colour : 'transparent'};
  `}

  li {
    margin-left: -10px;

    &:first-of-type {
      margin-left: 0;
    }
  }
`;

export const RemovedPiecesListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;

  max-width: 32px;
  height: 100%;
  border-radius: 50%;
`;
