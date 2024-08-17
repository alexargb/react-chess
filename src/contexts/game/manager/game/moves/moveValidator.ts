import type {
  ChessGame,
  ChessPieceMove,
  ChessPieceStrictMove,
  ChessSquare,
} from '~/types';
import {
  getSquaresByPieceColour,
  strictMovesMapper,
  movesFromBlockedMoves,
  getPositionFromMove,
  squareHasPieceFromColour,
  validateFinalPosition,
} from './helpers';

type MoveValidatorFunction = (square: ChessSquare) => (move: ChessPieceMove) => ChessPieceStrictMove[];

export const getMoveValidator = (game: ChessGame): MoveValidatorFunction => {
  if (!game?.board) return () => () => [];
  const ownColour = game.turn;
  const enemyColour = ownColour === 'white' ? 'black' : 'white';

  const ownPositions = getSquaresByPieceColour(game, game.turn);
  const enemyPositions = getSquaresByPieceColour(game, enemyColour);
  const allPositions = { ownPositions, enemyPositions };

  // TODO: check for 'checks'
  
  return (square) => {
    const moveToStrictMoves = strictMovesMapper(square);
    const getUnblockedMoves = movesFromBlockedMoves(square, allPositions);

    return (move) => {
      const { conditions } = move;
      const strictMoves = moveToStrictMoves(move)
        .filter(validateFinalPosition(square))
        .flatMap(getUnblockedMoves);

      // TODO: filter if it leaves the king in 'check'

      return strictMoves.filter((strictMove) => {
        if (!game?.board) return false;
        if (!conditions?.length) return true;

        const { x, y } = getPositionFromMove(square, strictMove);
        const destination = game.board[y][x];

        if (
          conditions.includes('eating') &&
          !squareHasPieceFromColour(destination, enemyColour)
        ) return false;

        if (conditions.includes('en passant')) {
          // TODO: en passant
          return false;
        }

        if (
          conditions.includes('unblocked') &&
          squareHasPieceFromColour(destination, enemyColour)
        ) return false;

        if (
          conditions.includes('unmoved') &&
          square.piece?.hasMoved
        ) return false;

        if (conditions.includes('king castle')) {
          // TODO: king castle
          return false;
        }

        if (conditions.includes('queen castle')) {
          // TODO: queen castle
          return false;
        }

        return true;
      });
    };
  } ;
};
