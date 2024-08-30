import React from 'react';
import type { ChessPiece } from '~/types';
import type { PieceSvgProps } from './types';
import * as White from './white';
import * as Black from './black';

type Size = 'normal' | 'small';
type PieceProps = {
  piece: ChessPiece;
  size?: Size;
};

const getPieceProps = (size?: Size): PieceSvgProps => {
  switch(size) {
    case 'small':
      return { width: '5.5vw', height: '5.5vw' };
    case 'normal':
    default:
      return { width: '10vw', height: '10vw' };
  }
};

export const Piece = ({ piece, size }: PieceProps) => {
  const { shortName, colour } = piece || {};
  const {
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
    Pawn,
  } = colour === 'white' ? White : Black;
  const pieceProps = getPieceProps(size);

  switch (shortName) {
    case 'k':
      return <King {...pieceProps} />;
    case 'q':
      return <Queen {...pieceProps} />;
    case 'r':
      return <Rook {...pieceProps} />;
    case 'b':
      return <Bishop {...pieceProps} />;
    case 'n':
      return <Knight {...pieceProps} />;
    case 'p':
      return <Pawn {...pieceProps} />;
    case '-':
    default:
      return null;
  }
};
