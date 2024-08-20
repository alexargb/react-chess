import type { ChessColour } from '~/types';

export const getOppositeColour = (colour: ChessColour): ChessColour =>
  colour === 'white' ? 'black' : 'white';
