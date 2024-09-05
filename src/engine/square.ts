import type {
  ChessBoardCoordinate,
  ChessColour,
  ChessPieceShortName,
  ChessPieceStrictMove,
  ChessPosition,
  ChessSquare,
} from '~/types';
import { Piece } from './piece';

export class Square implements ChessSquare {
  x: ChessBoardCoordinate;
  y: ChessBoardCoordinate;
  colour: ChessColour;
  marked: boolean = false;
  selected: boolean = false;
  piece?: Piece;
  promotesFor?: ChessColour;

  private getPieceColour(y: ChessBoardCoordinate): ChessColour {
    return y < 4 ? 'black' : 'white';
  }

  private getPositionColour(
    x: ChessBoardCoordinate,
    y: ChessBoardCoordinate,
  ): ChessColour {
    const sum = x + y;
    const rest = sum % 2;
  
    return rest ? 'black' : 'white';
  }

  constructor(
    x: ChessBoardCoordinate,
    y: ChessBoardCoordinate,
    shortName: ChessPieceShortName,
  ) {
    
    this.x = x;
    this.y = y;
    this.colour = this.getPositionColour(x, y);

    const pieceId = y * 8 + x;
    if (shortName !== '-') {
      this.piece = new Piece(pieceId, shortName, this.getPieceColour(y));
    }
  }

  public static getSquareFromChessSquare(baseSquare: ChessSquare): Square {
    const {
      x,
      y,
      piece,
      marked,
      selected,
      promotesFor,
    } = baseSquare;
    const newSquare = new Square(x, y, piece?.shortName || '-');

    newSquare.marked = marked;
    newSquare.selected = selected;
    newSquare.promotesFor = promotesFor;
    if (newSquare.piece && piece) {
      newSquare.piece.id = piece.id;
      newSquare.piece.moves = piece.moves;
      newSquare.piece.possibleMoves = piece.possibleMoves;
      newSquare.piece.pawnJustJumped = piece.pawnJustJumped;
      newSquare.piece.hasMoved = piece.hasMoved;
      newSquare.piece.colour = piece.colour;
    }

    return newSquare;
  }

  public hasPiece(shortName: ChessPieceShortName): boolean {
    return this.piece?.shortName === shortName;
  }

  public hasPieceOfColour(colour: ChessColour): boolean {
    return this.piece?.colour === colour;
  }

  public hasPossibleMoves(): boolean {
    if (!this.piece) return false;
    return this.piece.possibleMoves.length > 0;
  }

  public markJumpedState(markedSquare: Square) {
    if (
      this.piece &&
      this.hasPiece('p') &&
      Math.abs(markedSquare.y - this.y) === 2
    ) this.piece.pawnJustJumped = true;
  }

  public getPositionFromMove(move: ChessPieceStrictMove): ChessPosition {
    return {
      x: (this.x + move.changeX) as ChessBoardCoordinate,
      y: (this.y + move.changeY) as ChessBoardCoordinate,
    };
  }
}
