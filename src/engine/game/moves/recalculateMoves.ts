import type { ChessGame, ChessPieceStrictMove, ChessSquare } from '~/types';
import type { MoveValidatorFunction } from './moveValidator';
import type { MovePieceFunction } from './movePiece';
import { getGameColours, jsonDeepCopy } from '../helpers';
import { getPositionFromMove, getSquaresByPieceColour } from './helpers';
import { getMoveValidator } from './moveValidator';
import { movePieceGetter } from './movePiece';

const recalculateMovesGetter = (validateMove: MoveValidatorFunction) => (square: ChessSquare): ChessSquare => {
  if (square.piece) {
    square.piece.possibleMoves = square.piece?.moves
      .flatMap(validateMove(square));
  }
  return square;
};

const leavesOwnKingOnCheck = (game: ChessGame, movePiece: MovePieceFunction, finalSquare: ChessSquare) => {
  const [ownColour, enemyColour] = getGameColours(game);

  const gameAfterMove = movePiece(finalSquare);
  const newOwnSquares = getSquaresByPieceColour(gameAfterMove, ownColour);
  const newEnemySquares = getSquaresByPieceColour(gameAfterMove, enemyColour);

  const validateEnemyMove = getMoveValidator(
    [newEnemySquares, newOwnSquares],
    enemyColour,
  );
  const recalculateEnemyMoves = recalculateMovesGetter(validateEnemyMove);
  
  const leavesOwnKingOnCheck = newEnemySquares.some((square) => {
    const enemySquareWithPossibleMoves = recalculateEnemyMoves(square);
    return enemySquareWithPossibleMoves.piece?.possibleMoves.some(({ hitsKing }) => hitsKing);
  });

  return leavesOwnKingOnCheck;
};

const checkFilterer = (game: ChessGame, square: ChessSquare) => {
  return (move: ChessPieceStrictMove): boolean => {
    if (!game?.board) return false;
    const testGame = jsonDeepCopy(game);
    const movePiece = movePieceGetter(testGame, square, false);

    const isCastle = square.piece?.shortName === 'k' && Math.abs(move.changeX) > 1;
    if (isCastle) {
      const middleMove = {
        changeY: 0,
        changeX: move.changeX / 2,
      };

      const middleCastlePosition = getPositionFromMove(square, middleMove);
      const middleSquare = testGame.board[square.y][middleCastlePosition.x];

      if (leavesOwnKingOnCheck(testGame, movePiece, middleSquare)) return false;
    }

    const { x, y } = getPositionFromMove(square, move);
    const finalSquare = testGame.board[y][x];
    return !leavesOwnKingOnCheck(testGame, movePiece, finalSquare);
  };
};

export const recalculateMoves = (game: ChessGame): ChessGame => {
  if (!game?.board) return;
  const [ownColour, enemyColour] = getGameColours(game);

  const ownSquares = getSquaresByPieceColour(game, ownColour);
  const enemySquares = getSquaresByPieceColour(game, enemyColour);

  const validateOwnMove = getMoveValidator(
    [ownSquares, enemySquares],
    ownColour,
  );
  const recalculateOwnMoves = recalculateMovesGetter(validateOwnMove);

  const ownSquaresWithPossibleMoves = ownSquares.map((square) => {
    const squareWithPossibleMoves = recalculateOwnMoves(square);

    if (!squareWithPossibleMoves.piece) return squareWithPossibleMoves;

    squareWithPossibleMoves.piece.possibleMoves =
      squareWithPossibleMoves.piece.possibleMoves.filter(checkFilterer(game, square));

    return squareWithPossibleMoves;
  });

  ownSquaresWithPossibleMoves.forEach((square) => {
    if (!game?.board) return;
    const { x, y } = square;
    game.board[y][x] = square;
  });

  return game;
};
