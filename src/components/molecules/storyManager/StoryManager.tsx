import { useGameContext } from '~/hooks';
import { useKeyboardUndoRedo } from './useKeyboardUndoRedo';
import { StoryManagerContainer } from './styled';
import { SideArrow } from '~/components/atoms/sideArrow';

type StoryManagerProps = {
  hidden: boolean;
};

export const StoryManager = ({ hidden }: StoryManagerProps) => {
  const { currentGame, undo, redo } = useGameContext();
  useKeyboardUndoRedo(hidden);

  return (
    <StoryManagerContainer>
      <SideArrow
        onClick={undo}
        disabled={!currentGame?.story.canUndo}
        left
        title="Arrow Left"
      />
      <SideArrow
        onClick={redo}
        disabled={!currentGame?.story.canRedo}
        right
        title="Arrow Right"
      />
    </StoryManagerContainer>
  );
};
