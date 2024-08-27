import { useGameContext, useViewContext } from '~/hooks';
import { ColourSpan, GameDiv, GameTitle } from './styled';
import { Board } from '~/components/molecules/board';
import { Circle } from '~/components/atoms/circle';

export const Game = () => {
  const { currentView } = useViewContext();
  const { currentGame } = useGameContext();

  if (!currentGame) return null;

  return (
    <GameDiv $visible={currentView === 'game'} role="game">
      <GameTitle>
        Turn: <ColourSpan><Circle $radius={6} $colour={currentGame.turn}/></ColourSpan>
      </GameTitle>
      <Board />
    </GameDiv>
  );
};
