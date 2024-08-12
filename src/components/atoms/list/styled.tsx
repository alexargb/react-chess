import styled from 'styled-components';

export const List = styled.ul`
  width: fit-content;
  padding: 0;
  list-style: none;
  color: #FFF;

  border-radius: 4px;
  overflow: hidden;
`;

const listItemBorder = '1px solid #AAA';
const transparentBorder = '1px solid transparent';

export const ListItem = styled.li`
  padding: 8px 16px;
  background-color: #555;

  user-select: none;
  -webkit-user-select: none;

  border: ${transparentBorder};
  border-bottom: ${listItemBorder};

  &:hover {
    cursor: pointer;
    background-color: #454545;
    border: ${listItemBorder};

    &:active {
      background-color: #333;
    }
  }

  &:first-of-type {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  &:last-of-type {
    border-bottom: ${transparentBorder};
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    &:hover {
      border-top: ${transparentBorder};
      border-bottom: ${listItemBorder};
    }
  }
`;
