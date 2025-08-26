import { Menu } from '~/components/molecules/menu';
import { Record } from '~/components/molecules/record';
import { Game } from '~/components/organisms/game';
import { capitalize } from '~/helpers/capitalize';
import { useViewContext } from '~/hooks';

import {
  Chevron,
  CurrentViewSpan,
  MenuLink,
  WrapperContainer,
  WrapperTitle,
} from './styled';

export const Wrapper = () => {
  const { currentView, setCurrentView } = useViewContext();
  const returnToMenu = () => setCurrentView?.('menu');
  const shouldShowChevron = currentView !== 'menu';

  return (
    <WrapperContainer>
      <WrapperTitle onClick={returnToMenu}>
        <MenuLink>React Chess</MenuLink>
        <Chevron $visible={shouldShowChevron}>{shouldShowChevron && '>'}</Chevron>
        <CurrentViewSpan $visible={shouldShowChevron}>
          {shouldShowChevron && capitalize(currentView)}
        </CurrentViewSpan>
      </WrapperTitle>
      <Menu />
      <Game />
      <Record />
    </WrapperContainer>
  );
};
