import { useGameContext, useViewContext } from '~/hooks';
import { useOverflowHidden } from './useOverflowHidden';
import { GameContainer } from './styled';
import { Board } from '~/components/molecules/board';
import { RemovedPieces } from '~/components/molecules/removedPieces';
import { StoryManager } from '~/components/molecules/storyManager';

export const Game = () => {
  const { currentView } = useViewContext();
  const { currentGame } = useGameContext();

  const visible = currentView === 'game';
  const hidden = useOverflowHidden(visible);

  if (!currentGame) return null;
  return (
    <GameContainer $visible={visible} $hidden={hidden} role="game">
      <RemovedPieces colour="white" />
      <Board />
      <RemovedPieces colour="black" />
      <StoryManager hidden={hidden} />
    </GameContainer>
  );
};
