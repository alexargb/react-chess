import React from 'react';
import { useGameContext } from '~/hooks';
import { StoryManagerContainer } from './styled';
import { SideArrow } from '~/components/atoms/sideArrow';

export const StoryManager = () => {
  const { currentGame, undo, redo } = useGameContext();

  return (
    <StoryManagerContainer>
      <SideArrow
        onClick={undo}
        disabled={!currentGame?.story.canUndo}
        left
      />
      <SideArrow
        onClick={redo}
        disabled={!currentGame?.story.canRedo}
        right
      />
    </StoryManagerContainer>
  );
};
