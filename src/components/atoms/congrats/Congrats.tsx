import React from 'react';
import type { ChessGame } from '~/types';
import { getOppositeColour } from '~/engine/game/helpers';
import { capitalize } from '~/helpers/capitalize';
import { CongratsSpan, CongratsWrapper } from './styled';

type CongratsProps = {
  game: ChessGame;
};

export const Congrats = ({ game }: CongratsProps) => {
  const congratsColour = getOppositeColour(game.turn);
  const congratsMessage = `${capitalize(congratsColour)} won!`;

  return (
    <CongratsWrapper $visible={game.finished} role="congrats">
      <CongratsSpan $colour={congratsColour}>
        {congratsMessage}
      </CongratsSpan>
    </CongratsWrapper>
  );
};
