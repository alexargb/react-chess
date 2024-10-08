import type {
  ChessColour,
  ChessPiece,
  ChessPieceMoveset,
  ChessPieceShortName,
  ChessPieceStrictMoveset,
  ChessPosition,
} from '~/types';

import { getKingBasicMoves } from './king';
import { getQueenBasicMoves } from './queen';
import { getRookBasicMoves } from './rook';
import { getBishopBasicMoves } from './bishop';
import { getKnightBasicMoves } from './knight';
import { getPawnBasicMoves } from './pawn';
import { Square } from '../square';

type BasicMoves = {
  moves: ChessPieceMoveset;
  possibleMoves: ChessPieceStrictMoveset;
};

const defaultGetter = () => ({} as BasicMoves);

const BASIC_MOVES_MAP = {
  'k': getKingBasicMoves,
  'q': getQueenBasicMoves,
  'r': getRookBasicMoves,
  'b': getBishopBasicMoves,
  'n': getKnightBasicMoves,
  'p': getPawnBasicMoves,
  '-': defaultGetter,
};

const PIECE_SHORT_NAMES: ChessPieceShortName[] = ['k', 'q', 'r', 'b', 'n', 'p'];

export class Piece implements ChessPiece {
  id: number;
  shortName: ChessPieceShortName;
  colour: ChessColour;
  moves: ChessPieceMoveset = [];
  possibleMoves: ChessPieceStrictMoveset = [];
  hasMoved: boolean = false;
  pawnJustJumped: boolean = false;
  lastMovedPiece?: boolean;
  previousPosition?: ChessPosition;

  constructor(
    id: number,
    shortName: ChessPieceShortName,
    colour: ChessColour,
    possibleMoves?: ChessPieceStrictMoveset,
  ) {
    this.id = id;
    this.shortName = shortName;
    this.colour = colour;

    const getBasicMoves = BASIC_MOVES_MAP[shortName];
    const basic = getBasicMoves(colour);

    this.moves = basic.moves;
    this.possibleMoves = possibleMoves || basic.possibleMoves;
  }

  public static isPieceShortName(shortName: ChessPieceShortName) {
    return PIECE_SHORT_NAMES.includes(shortName);
  }

  public static fromChessPiece({
    id,
    shortName,
    colour,
    hasMoved,
    possibleMoves,
    pawnJustJumped,
    lastMovedPiece,
    previousPosition,
  }: ChessPiece): Piece {
    const newPiece = new Piece(id, shortName, colour, possibleMoves);
    newPiece.hasMoved = hasMoved;
    newPiece.pawnJustJumped = pawnJustJumped;
    newPiece.lastMovedPiece = lastMovedPiece;
    newPiece.previousPosition = previousPosition;
    return newPiece;
  }

  public onPieceMove(previousPosition: ChessPosition): Piece {
    this.previousPosition = previousPosition;
    this.lastMovedPiece = true;
    this.hasMoved = true;

    return this;
  }

  /**
   * (only promotes if promoting conditions are met)
   * @param promotesTo the Piece shortName to which the pawn will promote
   * @param initialSquare the Square that contains the Piece to be promoted
   * @returns 
   */
  public promote(initialSquare: Square, promotesTo?: ChessPieceShortName): boolean {
    const colour = initialSquare.piece?.colour;
    if (!promotesTo || !colour || !initialSquare.hasPiece('p')) return false;
  
    const getBasicMoves = BASIC_MOVES_MAP[promotesTo];
    const { moves } = getBasicMoves(colour);
    this.moves = moves;
    this.shortName = promotesTo;
    return true;
  };
}
