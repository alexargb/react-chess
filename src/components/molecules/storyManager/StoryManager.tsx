import React from 'react';
import { useGameContext } from '~/hooks';
import { Redo } from '~/components/atoms/redo';
import { Undo } from '~/components/atoms/undo';
import { StoryManagerContainer } from './styled';

export const StoryManager = () => {
  const { currentGame, undo, redo } = useGameContext();

  return (
    <StoryManagerContainer>
      <Undo
        onClick={undo}
        disabled={!currentGame?.story.canUndo}
      />
      <Redo
        onClick={redo}
        disabled={!currentGame?.story.canRedo}
      />
    </StoryManagerContainer>
  );
};
