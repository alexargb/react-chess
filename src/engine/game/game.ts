import type {
  ChessPieceShortName,
  ChessPieceStrictMove,
} from '~/types';
import type { ValidateMoveFunction } from './moveValidator';
import type { StoryEntry } from './story';
import { BaseGame } from './baseGame';
import { Square } from '../square';
import { MoveValidator } from './moveValidator';
import { getOppositeColour } from './helpers';

type MoveValidatorFunction = (square: Square) => ValidateMoveFunction;

export class Game extends BaseGame {
  constructor(game?: Game) {
    super(game);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
  }

  // recalculateGameMoves
  private static recalculateMovesGetter(validateMove: MoveValidatorFunction) {
    return (square: Square): Square => {
      if (square.piece) {
        square.piece.possibleMoves = square.piece?.moves
          .flatMap(validateMove(square));
      }
      return square;
    };
  }

  private static moveLeavesOwnKingOnCheck(game: Game, initialSquare: Square, move: ChessPieceStrictMove) {
    const { x, y } = initialSquare.getPositionFromMove(move);
    const finalSquare = game.board[y][x];
    const [ownColour, enemyColour] = game.gameColours;
  
    const gameAfterMove = game.movePiece(initialSquare, finalSquare, false);
    const newOwnSquares = gameAfterMove.getSquaresByPieceColour(ownColour);
    const newEnemySquares = gameAfterMove.getSquaresByPieceColour(enemyColour);
  
    const enemyMovesValidator = new MoveValidator([newEnemySquares, newOwnSquares], enemyColour);
    const recalculateEnemyMoves = Game.recalculateMovesGetter(enemyMovesValidator.getMoveValidator);
    
    const leavesOwnKingOnCheck = newEnemySquares.some((square) => {
      const enemySquareWithPossibleMoves = recalculateEnemyMoves(square);
      return enemySquareWithPossibleMoves.piece?.possibleMoves.some(({ hitsKing }) => hitsKing);
    });
  
    return leavesOwnKingOnCheck;
  };

  private checkFilterer(initialSquare: Square) {
    const testGame = new Game(this);
    return (move: ChessPieceStrictMove): boolean => {
      const isCastle = initialSquare.piece?.shortName === 'k' && Math.abs(move.changeX) > 1;
      if (isCastle) {
        const middleMove = {
          changeY: 0,
          changeX: move.changeX / 2,
        };
  
        if (Game.moveLeavesOwnKingOnCheck(testGame, initialSquare, middleMove)) return false;
      }
      return !Game.moveLeavesOwnKingOnCheck(testGame, initialSquare, move);
    };
  }

  private recalculateGameMoves() {
    const [ownColour, enemyColour] = this.gameColours;
  
    const ownSquares = this.getSquaresByPieceColour(ownColour);
    const enemySquares = this.getSquaresByPieceColour(enemyColour);
  
    const ownMovesValidator = new MoveValidator([ownSquares, enemySquares], ownColour);
    const recalculateOwnMoves = Game.recalculateMovesGetter(ownMovesValidator.getMoveValidator);
  
    ownSquares.forEach((square) => {
      const squareWithPossibleMoves = recalculateOwnMoves(square);
  
      if (squareWithPossibleMoves.piece) {
        squareWithPossibleMoves.piece.possibleMoves =
          squareWithPossibleMoves.piece.possibleMoves.filter(this.checkFilterer(square));
      };

      const { x, y } = square;
      this.board[y][x] = square;
    });
  }

  // movePiece
  public movePiece(
    initialSquare: Square | undefined | null,
    finalSquare: Square,
    shouldDoTheMove: boolean,
    promotesTo?: ChessPieceShortName,
  ): Game {
    if (!initialSquare?.piece) return this;
    const mockGame = new Game(this);
    const selectedPiece = initialSquare.piece;

    // removing pawnJustJumpedStates
    mockGame.removeJumpedStates();

    // castling
    if (initialSquare.hasPiece('k')) {
      const isQueenCastle = initialSquare.x - finalSquare.x > 1;
      const isKingCastle = finalSquare.x - initialSquare.x > 1;
      if (isKingCastle || isQueenCastle) {
        const rookRow = mockGame.board[initialSquare.y];
        const rookSquare = isKingCastle ? rookRow[7] : rookRow[0];
        const rookFinalX = isKingCastle ? initialSquare.x + 1 : initialSquare.x - 1;
        mockGame.board[initialSquare.y][rookFinalX].piece = rookSquare.piece;
        delete rookSquare.piece;
      }
    }

    // en passant
    if (
      initialSquare.hasPiece('p') &&
      finalSquare.x !== initialSquare.x &&
      !finalSquare.hasPiece('p')
    ) {
      const sideSquare = mockGame.board[initialSquare.y][finalSquare.x];
      if (
        sideSquare.piece &&
        sideSquare.hasPiece('p') &&
        sideSquare.hasPieceOfColour(this.enemyColour)
      ) {
        if (shouldDoTheMove) {
          this.removedPieces.push(sideSquare.piece);
        }
        delete sideSquare.piece;
      }
    }

    // pawn promotion
    selectedPiece.promote(promotesTo, initialSquare);

    // if should do the move
    if (shouldDoTheMove) {
      initialSquare.markJumpedState(finalSquare);

      selectedPiece.hasMoved = true;
      if (finalSquare.piece) {
        this.removedPieces.push(finalSquare.piece);
      }

      this.turn = getOppositeColour(this.turn);
    }

    // move
    mockGame.board[finalSquare.y][finalSquare.x].piece = selectedPiece;
    delete mockGame.board[initialSquare.y][initialSquare.x].piece;

    if (shouldDoTheMove) {
      this.board = mockGame.board;
      this.unselectSquare();
      this.recalculateGameMoves();
      this.updateStory();
      return this;
    }
    return mockGame;
  }

  // story manager
  private updateFromStoryEntry({
    board,
    turn,
    removedPieces,
  }: StoryEntry) {
    this.board = board;
    this.turn = turn;
    this.removedPieces = removedPieces;
    this.recalculateGameMoves();
  }

  public undo() {
    this.updateFromStoryEntry(this.story.undo());
  }

  public redo() {
    this.updateFromStoryEntry(this.story.redo());
  }
}
