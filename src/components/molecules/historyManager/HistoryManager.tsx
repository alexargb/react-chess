import { SideArrow } from '~/components/atoms/sideArrow';
import { useGameContext } from '~/hooks';

import { HistoryManagerContainer } from './styled';
import { useKeyboardUndoRedo } from './useKeyboardUndoRedo';

type HistoryManagerProps = {
  hidden: boolean;
};

export const HistoryManager = ({ hidden }: HistoryManagerProps) => {
  const { currentGame, undo, redo } = useGameContext();
  useKeyboardUndoRedo(hidden);

  return (
    <HistoryManagerContainer>
      <SideArrow
        onClick={undo}
        disabled={!currentGame?.history.canUndo}
        left
        title="Arrow Left"
      />
      <SideArrow
        onClick={redo}
        disabled={!currentGame?.history.canRedo}
        right
        title="Arrow Right"
      />
    </HistoryManagerContainer>
  );
};
