import { capitalize } from '~/helpers/capitalize';
import { CongratsSpan, CongratsWrapper } from './styled';

type CongratsProps = {
  game: ChessGame;
};

const getCongratsMessage = ({ finishWinner }: ChessGame): string => {
  switch (finishWinner) {
    case 'black':
    case 'white':
      return `${capitalize(finishWinner)} won!`;
    default:
      return 'Stalemate 🤷🏼';
  }
};

export const Congrats = ({ game }: CongratsProps) => {
  const congratsMessage = getCongratsMessage(game);

  return (
    <CongratsWrapper $visible={!!game?.finished} role="congrats">
      <CongratsSpan $winner={game.finishWinner || 'white'}>
        {congratsMessage}
      </CongratsSpan>
    </CongratsWrapper>
  );
};
