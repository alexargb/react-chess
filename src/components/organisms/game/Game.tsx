import { Board } from '~/components/molecules/board/Board';
import { useGameContext } from '~/hooks';
import { GameDiv, GameTitle } from './styled';

export const Game = () => {
  const { currentGame } = useGameContext();

  return (
    <GameDiv role="game">
      <GameTitle>
        Turn: <span style={{ color: currentGame?.turn }}>{currentGame?.turn}</span>
      </GameTitle>
      <Board board={currentGame?.board} />
    </GameDiv>
  );
};
