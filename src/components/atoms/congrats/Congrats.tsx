import React from 'react';
import type { ChessGame } from '~/types';
import { getOppositeColour } from '~/engine/game/helpers';
import { capitalize } from '~/helpers/capitalize';
import { CongratsSpan, CongratsWrapper } from './styled';

type CongratsProps = {
  game: ChessGame | null;
};

export const Congrats = ({ game }: CongratsProps) => {
  const congratsColour = getOppositeColour(game?.turn || 'white');
  const congratsMessage = `${capitalize(congratsColour)} won!`;

  return (
    <CongratsWrapper $visible={!!game?.finished} role="congrats">
      <CongratsSpan $colour={congratsColour}>
        {congratsMessage}
      </CongratsSpan>
    </CongratsWrapper>
  );
};
