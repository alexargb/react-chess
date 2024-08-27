import React from 'react';
import type { ChessPiece, ChessSquare } from '~/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { Square } from '.';

const clickMock = jest.fn();

const piece: ChessPiece = {
  id: 1,
  shortName: 'k',
  colour: 'white',
  hasMoved: false,
  moves: [],
  possibleMoves: [],
  pawnJustJumped: false,
};

const square: ChessSquare = {
  piece,
  colour: 'black',
  x: 4,
  y: 0,
  marked: false,
  selected: false,
};

describe('Square', () => {
  afterEach(() => {
    square.marked = false;
    square.selected = false;
    delete square.promotesFor;
  });

  it('Should render Square with King', async () => {
    render(<Square square={square} onClick={clickMock}/>);

    expect(() => {
      screen.getAllByRole(/square/);
    }).not.toThrow();

    expect(() => {
      screen.getAllByRole(/piece/);
    }).not.toThrow();

    const kingPiece = screen.getByTestId(/white-king/);
    expect(kingPiece).toBeInTheDocument();
  });

  it('Should click on Square with King', async () => {
    render(<Square square={square} onClick={clickMock}/>);

    const kingPiece = screen.getByTestId(/white-king/);
    fireEvent.click(kingPiece);
    expect(clickMock).toHaveBeenCalled();
  });

  it('Should render marked Square with King', async () => {
    square.marked = true;
    render(<Square square={square} onClick={clickMock}/>);

    expect(() => {
      screen.getAllByRole(/square/);
    }).not.toThrow();

    expect(() => {
      screen.getAllByRole(/piece/);
    }).not.toThrow();

    expect(() => {
      screen.getAllByRole(/square-mark/);
    }).toThrow();

    const kingPiece = screen.getByTestId(/white-king/);
    expect(kingPiece).toBeInTheDocument();
  });

  it('Should render PromotionList when clicking on promoting square', () => {
    if (!square.piece) return;
    square.promotesFor = 'black';
    render(<Square square={square} onClick={clickMock}/>);

    expect(() => {
      screen.getAllByRole(/square/);
    }).not.toThrow();

    expect(() => {
      screen.getAllByRole(/promotion-list-item/);
    }).toThrow();

    const kingPiece = screen.getByTestId(/white-king/);
    fireEvent.click(kingPiece);
    expect(clickMock).not.toHaveBeenCalled();

    const firstPromotionSquare = screen.getAllByRole(/promotion-list-item/)[0];
    fireEvent.click(firstPromotionSquare);
    expect(clickMock).toHaveBeenCalled();
  });

  it('Should render marked empty Square', () => {
    delete square.piece;
    square.marked = true;
    render(<Square square={square} onClick={clickMock}/>);

    expect(() => {
      screen.getAllByRole(/square/);
    }).not.toThrow();

    expect(() => {
      screen.getAllByRole(/piece/);
    }).toThrow();

    expect(() => {
      screen.getAllByRole(/square-mark/);
    }).not.toThrow();
  });
});
