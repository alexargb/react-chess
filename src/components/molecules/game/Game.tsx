import React from 'react';
import { SmallTitle } from '~/components/atoms/title';
import { useGameContext } from '~/hooks';

export const Game = () => {
  const { currentGame } = useGameContext();

  return (
    <div className="game">
      <SmallTitle>
        Turn: <span style={{ color: currentGame?.turn }}>{currentGame?.turn}</span>
      </SmallTitle>
    </div>
  );
};
