import type { ChessGame } from '~/types';
import { newGame } from '~/engine';
import { getGameColours } from './gameColours';

const mockGame: ChessGame = newGame();

describe('gameColours', () => {
  it('Should return white for ownColour', () => {
    if (mockGame) mockGame.turn = 'white';
    const [ownColour, enemyColour] = getGameColours(mockGame);
    expect(ownColour).toBe('white');
    expect(enemyColour).toBe('black');
  });

  it('Should return white for ownColour', () => {
    if (mockGame) mockGame.turn = 'black';
    const [ownColour, enemyColour] = getGameColours(mockGame);
    expect(ownColour).toBe('black');
    expect(enemyColour).toBe('white');
  });

  it('Should return white for ownColour when empty game', () => {
    const [ownColour, enemyColour] = getGameColours(null);
    expect(ownColour).toBe('white');
    expect(enemyColour).toBe('black');
  });
});
