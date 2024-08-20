import type {
  ChessPieceMove,
  ChessPieceStrictMove,
  ChessSquare,
} from '~/types';
import { getDistanceToBorders } from './getDistanceToBorders';

type MoveType = 'preset' | 'vertical' | 'horizontal' | 'diagonal';

const getMoveType = ({ changeX, changeY }: ChessPieceMove): MoveType => {
  if (changeX === 'x' && changeY === 'x') return 'diagonal';
  if (changeX === 'x') return 'horizontal';
  if (changeY === 'x') return 'vertical';
  return 'preset';
};

const normalMoveToStrictMoveArray = (
  move: ChessPieceMove,
  initialSquare: ChessSquare,
): ChessPieceStrictMove[] => {
  const strictMove = {
    changeX: +move.changeX,
    changeY: +move.changeY,
  };

  return [strictMove];
};

const filterNonMoves = ({ changeX, changeY }: ChessPieceStrictMove): boolean =>
  changeX !== 0 || changeY !== 0;

export const strictMovesMapper = (initialSquare: ChessSquare) => {
  const { top, bottom, right, left } = getDistanceToBorders(initialSquare);

  return (move: ChessPieceMove): ChessPieceStrictMove[] => {
    let moveSet: ChessPieceStrictMove[] = [];
    switch (getMoveType(move)) {
      case 'preset':
        moveSet = normalMoveToStrictMoveArray(move, initialSquare);
        break;
      case 'vertical':
        moveSet = [
          {
            changeX: 0,
            changeY: top,
          },
          {
            changeX: 0,
            changeY: -bottom,
          },
        ];
        break;
      case 'horizontal':
        moveSet = [
          {
            changeX: right,
            changeY: 0,
          },
          {
            changeX: -left,
            changeY: 0,
          },
        ];
        break;
      case 'diagonal':
        moveSet = [
          {
            changeX: Math.min(top, right),
            changeY: Math.min(top, right),
          },
          {
            changeX: -Math.min(top, left),
            changeY: Math.min(top, left),
          },
          {
            changeX: Math.min(bottom, right),
            changeY: -Math.min(bottom, right),
          },
          {
            changeX: -Math.min(bottom, left),
            changeY: -Math.min(bottom, left),
          },
        ];
        break;
    }

    return moveSet.filter(filterNonMoves);
  };
};
