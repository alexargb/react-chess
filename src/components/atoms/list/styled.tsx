import styled from 'styled-components';

export const List = styled.ul`
  width: fit-content;
  padding: 0;
  list-style: none;
  color: #FFF;

  border-radius: 4px;
  overflow: hidden;

  margin-block-start: 0;
  margin-block-end: 0;
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
    border-top: ${transparentBorder};

    &:active {
      background-color: #46861E;
    }
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

  &:first-of-type {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    &:hover {
      border-top: ${listItemBorder}; // to override last-of-type's non top border
    }
  }
`;
