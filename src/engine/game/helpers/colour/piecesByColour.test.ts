import type { ChessPiece } from '~/types';
import { getPiecesByColour } from './piecesByColour';
import { Piece } from '~/engine/piece';

const whitePawn = new Piece(1, 'p', 'white');
const whiteBishop = new Piece(2, 'b', 'white');

const blackPawn = new Piece(3, 'p', 'black');
const blackBishop = new Piece(4, 'b', 'black');

const testPiecesArray: ChessPiece[] = [
  whitePawn,
  blackPawn,
  whiteBishop,
  blackBishop,
];

describe('piecesByColour', () => {
  it('Should return white pieces from array', () => {
    const result = getPiecesByColour(testPiecesArray, 'black');

    expect(result).toContain(blackPawn);
    expect(result).toContain(blackBishop);
  });
  it('Should return black pieces from array', () => {
    const result = getPiecesByColour(testPiecesArray, 'white');

    expect(result).toContain(whitePawn);
    expect(result).toContain(whiteBishop);
  });
});
