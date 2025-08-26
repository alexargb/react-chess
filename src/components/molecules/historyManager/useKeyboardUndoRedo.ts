import { useGameContext, useKeyDown } from '~/hooks';

export const useKeyboardUndoRedo = (hidden: boolean) => {
  const { undo, redo } = useGameContext();

  useKeyDown(({ key }) => {
    if (!hidden) {
      if (key === 'ArrowLeft') undo?.();
      if (key === 'ArrowRight') redo?.();
    }
  }, [hidden, undo, redo]);
}
