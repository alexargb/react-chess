import { useGameContext, useKeyPress } from '~/hooks';

export const useKeyboardUndoRedo = (hidden: boolean) => {
  const { undo, redo } = useGameContext();

  useKeyPress(({ key }) => {
    if (!hidden) {
      if (key === 'ArrowLeft') undo?.();
      if (key === 'ArrowRight') redo?.();
    }
  }, [hidden]);
}
