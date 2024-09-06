import { useGameContext, useViewContext } from '~/hooks';
import { GameDiv } from './styled';
import { Board } from '~/components/molecules/board';
import { RemovedPieces } from '~/components/molecules/removedPieces';
import { StoryManager } from '~/components/molecules/storyManager';

export const Game = () => {
  const { currentView } = useViewContext();
  const { currentGame } = useGameContext();

  if (!currentGame) return null;

  return (
    <GameDiv $visible={currentView === 'game'} role="game">
      <RemovedPieces colour="white" />
      <Board />
      <RemovedPieces colour="black" />
      <StoryManager />
    </GameDiv>
  );
};
