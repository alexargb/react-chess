import React from 'react';
import type { ChessPiece } from '~/types';
import * as White from './white';
import * as Black from './black';

type PieceProps = {
  piece: ChessPiece;
};

export const Piece = ({ piece }: PieceProps) => {
  const { shortName, colour } = piece || {};
  const {
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
    Pawn,
  } = colour === 'white' ? White : Black;

  // TODO: add piece movement logic

  switch (shortName) {
    case 'k':
      return <King />;
    case 'q':
      return <Queen />;
    case 'r':
      return <Rook />;
    case 'b':
      return <Bishop />;
    case 'n':
      return <Knight />;
    case 'p':
      return <Pawn />;
    case '-':
    default:
      return null;
  }
};
