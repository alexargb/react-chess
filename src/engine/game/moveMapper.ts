import type {
  ChessBoardCoordinate,
  ChessPieceMove,
  ChessPieceStrictMove,
  ChessPosition,
} from '~/types';
import { Square } from '../square';

type MoveType = 'preset' | 'vertical' | 'horizontal' | 'diagonal';
type StrictMoveArray = ChessPieceStrictMove[];

export class MoveMapper {
  initialSquare: Square;

  verticalMoveSet: StrictMoveArray;
  horizontalMoveSet: StrictMoveArray;
  diagonalMoveSet: StrictMoveArray;

  ownSquares: Square[];
  enemySquares: Square[];

  private getDistanceToBorders(position: ChessPosition) {
    return {
      top: 7 - position.y,
      bottom: position.y,
      right: 7 - position.x,
      left: position.x,
    };
  }

  constructor(initialSquare: Square, squareSets: Square[][]) {
    const [ownSquares, enemySquares] = squareSets;
    this.ownSquares = ownSquares;
    this.enemySquares = enemySquares;

    this.initialSquare = initialSquare;
    const { top, bottom, right, left } = this.getDistanceToBorders(initialSquare);

    this.verticalMoveSet = [
      { changeX: 0, changeY: top },
      { changeX: 0, changeY: -bottom },
    ].filter(this.filterNonMoves);

    this.horizontalMoveSet = [
      { changeX: right, changeY: 0 },
      { changeX: -left, changeY: 0 },
    ].filter(this.filterNonMoves);

    this.diagonalMoveSet = [
      { changeX: Math.min(top, right), changeY: Math.min(top, right) },
      { changeX: -Math.min(top, left), changeY: Math.min(top, left) },
      { changeX: Math.min(bottom, right), changeY: -Math.min(bottom, right) },
      { changeX: -Math.min(bottom, left), changeY: -Math.min(bottom, left) },
    ].filter(this.filterNonMoves);

    this.mapMoveToUnblockedMoves = this.mapMoveToUnblockedMoves.bind(this);
  }

  // mapMovesToStrictMoves

  private getMoveType({ changeX, changeY }: ChessPieceMove): MoveType {
    if (changeX === 'x' && changeY === 'x') return 'diagonal';
    if (changeX === 'x') return 'horizontal';
    if (changeY === 'x') return 'vertical';
    return 'preset';
  }

  private filterNonMoves({ changeX, changeY }: ChessPieceStrictMove): boolean {
    return changeX !== 0 || changeY !== 0;
  }

  private normalMoveToStrictMoveArray(move: ChessPieceMove): StrictMoveArray {
    return [{
      changeX: +move.changeX,
      changeY: +move.changeY,
    }];
  }

  public mapMovesToStrictMoves(move: ChessPieceMove): StrictMoveArray {
    let moveSet: StrictMoveArray = [];
    switch (this.getMoveType(move)) {
      case 'preset':
        moveSet = this.normalMoveToStrictMoveArray(move).filter(this.filterNonMoves);
        break;
      case 'vertical':
        moveSet = this.verticalMoveSet;
        break;
      case 'horizontal':
        moveSet = this.horizontalMoveSet;
        break;
      case 'diagonal':
        moveSet = this.diagonalMoveSet;
        break;
    }

    return moveSet;
  };

  // mapMoveToUnblockedMoves
  private getOrderedMovePositions = (move: ChessPieceStrictMove): ChessPosition[] => {
    if (move.changeX === 0 && move.changeY === 0) return [];

    const orderedPositions: ChessPosition[] = [];
    const initial = this.initialSquare;
    const final = initial.getPositionFromMove(move);
  
    if (move.changeY === 0) {
      // horizontal
      const xSummator = initial.x <= final.x ? 1 : -1;
      for (let x = initial.x + xSummator; x !== final.x; x += xSummator) {
        orderedPositions.push({
          x: x as ChessBoardCoordinate,
          y: initial.y,
        });
      }
    } else if (move.changeX === 0) {
      // vertical
      const ySummator = initial.y <= final.y ? 1 : -1;
      for (let y = initial.y + ySummator; y !== final.y; y += ySummator) {
        orderedPositions.push({
          x: initial.x,
          y: y as ChessBoardCoordinate,
        });
      }
    } else if (Math.abs(move.changeX) === Math.abs(move.changeY)) {
      // diagonal
      const xMultiplier = initial.x <= final.x ? 1 : -1;
      const yMultiplier = initial.y <= final.y ? 1 : -1;
      for (let i = 1; i < Math.abs(move.changeX); i += 1) {
        orderedPositions.push({
          x: (initial.x + xMultiplier * i) as ChessBoardCoordinate,
          y: (initial.y + yMultiplier * i) as ChessBoardCoordinate,
        });
      }
    }
  
    return orderedPositions.concat(final);
  }

  private sameCoordinatesChecker(a: ChessPosition) {
    return (b: ChessPosition): boolean => a.x === b.x && a.y === b.y;
  }

  private promotes(finalPosition: ChessPosition): boolean {
    const isPawn = this.initialSquare.piece?.shortName === 'p';
    const { top, bottom } = this.getDistanceToBorders(finalPosition);
  
    return isPawn && (top === 0 || bottom === 0);
  };
  
  private getChessPieceStrictMove(
    position: ChessPosition,
    enemySquare?: Square,
  ): ChessPieceStrictMove {
    return {
      changeX: position.x - this.initialSquare.x,
      changeY: position.y - this.initialSquare.y,
      hitsKing: enemySquare?.piece?.shortName === 'k',
      promotes: this.promotes(position),
    }
  };

  public mapMoveToUnblockedMoves(move: ChessPieceStrictMove): ChessPieceStrictMove[] {
    const orderedMovePositions = this.getOrderedMovePositions(move);
    const moves: ChessPieceStrictMove[] = [];

    for (let i = 0; i < orderedMovePositions.length; i += 1) {
      const position = orderedMovePositions[i];
      const shareCoordinates = this.sameCoordinatesChecker(position);

      const ownSquare = this.ownSquares.find(shareCoordinates);
      if (!!ownSquare) break;

      const enemySquare = this.enemySquares.find(shareCoordinates);

      const strictMove = this.getChessPieceStrictMove(position, enemySquare);
      moves.push(strictMove);

      if (!!enemySquare) break;
    }

    return moves;
  }
}
