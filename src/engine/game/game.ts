import type {
  ChessFinishWinner,
  ChessGame,
  ChessPieceShortName,
  ChessPieceStrictMove,
} from '~/types';
import type { ValidateMoveFunction } from './moveValidator';
import type { StoryEntry } from './story';
import { BaseGame } from './baseGame';
import { Square } from '../square';
import { MoveValidator } from './moveValidator';

type MoveValidatorFunction = (square: Square) => ValidateMoveFunction;

export class Game extends BaseGame implements ChessGame {
  public get finished() {
    const ownSquares = this.getSquaresByPieceColour(this.turn);
    return !ownSquares.some((square) => square.hasPossibleMoves());
  }

  public get finishWinner(): ChessFinishWinner {
    if (!this.finished) return null;
    this.changeTurn();
    this.recalculateGameMoves();
    this.changeTurn();
    if (!this.ownKingIsOnCheck) return 'stalemate';
    return this.enemyColour;
  }

  constructor(id?: number) {
    super(id);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
  }

  public static fromChessGame(game: ChessGame): Game {
    const newGame = new Game(game.id);
    BaseGame.fromChessGame(game, newGame);
    return newGame;
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

  private static moveLeavesOwnKingOnCheck(
    game: Game,
    initialSquare: Square,
    move: ChessPieceStrictMove,
  ): boolean {
    const { x, y } = initialSquare.getPositionFromMove(move);
    const finalSquare = game.board[y][x];
    const [ownColour, enemyColour] = game.gameColours;
  
    const gameAfterMove = game.movePiece(initialSquare, finalSquare, false);
    const newOwnSquares = gameAfterMove.getSquaresByPieceColour(ownColour);
    const newEnemySquares = gameAfterMove.getSquaresByPieceColour(enemyColour);
  
    const enemyMovesValidator = new MoveValidator([newEnemySquares, newOwnSquares], enemyColour);
    const recalculateEnemyMoves = Game.recalculateMovesGetter(enemyMovesValidator.getMoveValidator);

    newEnemySquares.forEach((square) => {
      const enemySquareWithPossibleMoves = recalculateEnemyMoves(square);
      gameAfterMove.board[square.y][square.x] = enemySquareWithPossibleMoves;
    });
  
    return gameAfterMove.ownKingIsOnCheck;
  };

  private checkFilterer(initialSquare: Square) {
    const testGame = Game.fromChessGame(this);
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

  private recalculateGameMoves(): Game {
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

    return this;
  }

  // movePiece
  public movePiece(
    initialSquare: Square | undefined | null,
    finalSquare: Square,
    shouldDoTheMove: boolean,
    promotesTo?: ChessPieceShortName,
  ): Game {
    if (!initialSquare?.piece) return this;
    const mockGame = Game.fromChessGame(this);
    const selectedPiece = initialSquare.piece;

    // removing previous states
    mockGame.removeJumpedStates();
    mockGame.removeLastMovedPieceState();

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
          this.removedPieces[this.enemyColour].push(sideSquare.piece);
        }
        delete sideSquare.piece;
      }
    }

    // pawn promotion
    selectedPiece.promote(initialSquare, promotesTo);

    // if should do the move
    if (shouldDoTheMove) {
      this.onPieceMove(initialSquare, finalSquare);
    }

    // move
    mockGame.board[finalSquare.y][finalSquare.x].piece = selectedPiece;
    delete mockGame.board[initialSquare.y][initialSquare.x].piece;

    mockGame.board[initialSquare.y][initialSquare.x].lastMovedSquare = true;
    this.lastMovedSquare = mockGame.board[initialSquare.y][initialSquare.x];

    if (shouldDoTheMove) {
      this.board = mockGame.board;
      this.recalculateGameMoves()
        .unselectSquare()
        .updateStory();

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
    this.unselectSquare();
    this.board = board;
    this.turn = turn;
    this.removedPieces = removedPieces;
    this.recalculateGameMoves();
  }

  public undo(): Game {
    this.updateFromStoryEntry(this.story.undo());
    return this;
  }

  public redo(): Game {
    this.updateFromStoryEntry(this.story.redo());
    return this;
  }
}
