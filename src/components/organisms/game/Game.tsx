import { Board } from '~/components/molecules/board';
import { HistoryManager } from '~/components/molecules/historyManager';
import { RemovedPieces } from '~/components/molecules/removedPieces';
import { useGameContext, useViewContext } from '~/hooks';

import { useOverflowHidden } from './useOverflowHidden';
import { GameContainer } from './styled';

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
      <HistoryManager hidden={hidden} />
    </GameContainer>
  );
};
