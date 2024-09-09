import type {
  ChessColour,
  ChessPieceMove,
  ChessPieceStrictMove,
  ChessPosition,
  ChessSquare,
} from '~/types';
import { Square } from '../square';
import { MoveMapper } from './moveMapper';
import { getOppositeColour } from './helpers';

export type ValidateMoveFunction = (move: ChessPieceMove) => ChessPieceStrictMove[];

export class MoveValidator {
  allSquares: Square[];
  ownSquares: Square[];
  enemySquares: Square[];
  ownColour: ChessColour;
  enemyColour: ChessColour;

  get ownKingSquare() {
    return this.ownSquares.find(({ piece }) => piece?.shortName === 'k');
  }

  constructor(
    squareSets: Square[][],
    ownColour: ChessColour,
  ) {
    const [ownSquares, enemySquares] = squareSets;
    this.ownSquares = ownSquares;
    this.enemySquares = enemySquares;
    this.allSquares = squareSets.flat();

    this.ownColour = ownColour;
    this.enemyColour = getOppositeColour(ownColour);

    this.getMoveValidator = this.getMoveValidator.bind(this);
  }

  private validateFinalPosition(initialSquare: ChessSquare) {
    const { x, y } = initialSquare;
  
    return (move: ChessPieceStrictMove): boolean => {
      const newX = x + move.changeX;
      const newY = y + move.changeY;
  
      return newX >= 0 && newY >= 0 && newX <= 7 && newY <= 7;
    };
  }

  private sameCoordinatesChecker(a: ChessPosition) {
    return (b: ChessPosition): boolean => a.x === b.x && a.y === b.y;
  }

  private getDestinationSquare(position: ChessPosition): Square | null {
    const shareCoordinates = this.sameCoordinatesChecker(position);
    return this.allSquares.find(shareCoordinates) || null;
  }

  private canEnPassant(
    square: ChessSquare,
    finalPosition: ChessPosition,
  ): boolean {
    const sidePosition: ChessPosition = {
      x: finalPosition.x,
      y: square.y,
    };
  
    const isAsidePawn = this.sameCoordinatesChecker(sidePosition);
    const sidePiece = this.enemySquares.find(isAsidePawn)?.piece;
    return !!sidePiece?.pawnJustJumped;
  }

  private validateCastle(isKingCastle: boolean): boolean {
    const rookX = isKingCastle ? 7 : 0;
    const rookSquare = this.ownSquares
      .find(({ x, piece }) => piece?.shortName === 'r' && x === rookX);
      
    if (!rookSquare?.piece || rookSquare.piece.hasMoved) return false;
    if (isKingCastle) return true;

    const kingSquareY = this.ownKingSquare?.y || -1;
    const middlePieceSquare = this.allSquares.find(({ x, y }) => {
      const isBetweenPieces = x > 0 && x < 3;
      return y === kingSquareY && isBetweenPieces;
    });
  
    return !middlePieceSquare;
  }

  public getMoveValidator(square: Square): ValidateMoveFunction {
    const moveMapper = new MoveMapper(square, [this.ownSquares, this.enemySquares]);

    return (move) => {
      const { conditions } = move;
      const strictMoves = moveMapper.mapMovesToStrictMoves(move)
        .filter(this.validateFinalPosition(square));
      const unblockedStrictMoves = strictMoves.flatMap(moveMapper.mapMoveToUnblockedMoves);

      return unblockedStrictMoves.filter((strictMove) => {
        if (!conditions?.length) return true;

        const destinationPosition = square.getPositionFromMove(strictMove);
        const destination = this.getDestinationSquare(destinationPosition);

        if (
          conditions.includes('en passant') &&
          this.canEnPassant(square, destinationPosition)
        ) return true;

        if (
          conditions.includes('eating') &&
          !destination?.hasPieceOfColour(this.enemyColour)
        ) return false;

        if (
          conditions.includes('unblocked') &&
          destination?.hasPieceOfColour(this.enemyColour)
        ) return false;

        if (conditions.includes('unmoved') && square.piece?.hasMoved) return false;

        const isQueenCastle = conditions.includes('queen castle');
        const isKingCastle = conditions.includes('king castle');
        const isCastle = isQueenCastle || isKingCastle;
        if (isCastle) return this.validateCastle(isKingCastle);

        return true;
      });
    };
  }
}
