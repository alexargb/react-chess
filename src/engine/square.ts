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
  lastMovedSquare?: boolean;

  private getPieceInitialColour(y: ChessBoardCoordinate): ChessColour {
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
    shortName?: ChessPieceShortName,
  ) {
    
    this.x = x;
    this.y = y;
    this.colour = this.getPositionColour(x, y);

    const pieceId = y * 8 + x;
    if (shortName && Piece.isPieceShortName(shortName)) {
      this.piece = new Piece(pieceId, shortName, this.getPieceInitialColour(y));
    }
  }

  public static fromChessSquare(baseSquare: ChessSquare): Square {
    const {
      x,
      y,
      piece,
      marked,
      selected,
      promotesFor,
      lastMovedSquare,
    } = baseSquare;
    const newSquare = new Square(x, y);

    newSquare.marked = marked;
    newSquare.selected = selected;
    newSquare.promotesFor = promotesFor;
    newSquare.lastMovedSquare = lastMovedSquare;
    if (piece) newSquare.piece = Piece.fromChessPiece(piece);

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

  public markJumpedState(markedSquare: Square): Square {
    if (
      this.piece &&
      this.hasPiece('p') &&
      Math.abs(markedSquare.y - this.y) === 2
    ) this.piece.pawnJustJumped = true;

    return this;
  }

  public getPositionFromMove(move: ChessPieceStrictMove): ChessPosition {
    return {
      x: (this.x + move.changeX) as ChessBoardCoordinate,
      y: (this.y + move.changeY) as ChessBoardCoordinate,
    };
  }

  public print(): string {
    const { piece, marked, selected, lastMovedSquare } = this;

    let secondChar = '-';
    if (marked) {
      secondChar = '+';
    } else if (selected) {
      secondChar = 'x';
    } else if (piece?.lastMovedPiece) {
      secondChar = '>';
    } else if (lastMovedSquare) {
      secondChar = '<';
    }

    return (piece?.shortName || '-') + secondChar;
  }
}
