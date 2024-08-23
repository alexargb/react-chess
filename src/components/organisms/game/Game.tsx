import { useGameContext } from '~/hooks';
import { ColourSpan, GameDiv, GameTitle } from './styled';
import { Board } from '~/components/molecules/board';
import { Circle } from '~/components/atoms/circle';

export const Game = () => {
  const { currentGame } = useGameContext();
  if (!currentGame) return null;

  return (
    <GameDiv role="game">
      <GameTitle>
        Turn: <ColourSpan><Circle $radius={6} $colour={currentGame.turn}/></ColourSpan>
      </GameTitle>
      <Board />
    </GameDiv>
  );
};
