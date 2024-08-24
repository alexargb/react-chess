import React from 'react';
import type { ChessPiece } from '~/types';
import { render, screen } from '@testing-library/react';
import { Piece } from '.';

const piece: ChessPiece = {
  id: 1,
  shortName: 'k',
  colour: 'white',
  hasMoved: false,
  moves: [],
  possibleMoves: [],
  pawnJustJumped: false,
};
describe('Pieces', () => {
  describe('White', () => {
    beforeAll(() => {
      piece.colour = 'white';
    });

    it('Should render King', () => {
      piece.shortName = 'k';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/white-king/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Queen', () => {
      piece.shortName = 'q';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/white-queen/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Rook', () => {
      piece.shortName = 'r';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/white-rook/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Bishop', () => {
      piece.shortName = 'b';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/white-bishop/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Knight', () => {
      piece.shortName = 'n';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/white-knight/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Pawn', () => {
      piece.shortName = 'p';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/white-pawn/);
      expect(kingElement).toBeInTheDocument();
    });
  });

  describe('Black', () => {
    beforeAll(() => {
      piece.colour = 'black';
    });

    it('Should render King', () => {
      piece.shortName = 'k';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/black-king/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Queen', () => {
      piece.shortName = 'q';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/black-queen/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Rook', () => {
      piece.shortName = 'r';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/black-rook/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Bishop', () => {
      piece.shortName = 'b';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/black-bishop/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Knight', () => {
      piece.shortName = 'n';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/black-knight/);
      expect(kingElement).toBeInTheDocument();
    });

    it('Should render Pawn', () => {
      piece.shortName = 'p';
      render(<Piece piece={piece}/>);

      const kingElement = screen.getByTestId(/black-pawn/);
      expect(kingElement).toBeInTheDocument();
    });
  });

  it('Should find Piece role when shortName is valid', () => {
    piece.shortName = 'k';
    render(<Piece piece={piece}/>);

    expect(() => {
      screen.getByRole(/piece/);
    }).not.toThrow();
  });

  it('Should not find Piece role when shortName is "-"', () => {
    piece.shortName = '-';
    render(<Piece piece={piece}/>);

    expect(() => {
      screen.getByRole(/piece/);
    }).toThrow();
  });
});
