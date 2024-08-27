import React from 'react';
import { useViewContext } from '~/hooks';
import { Menu } from '~/components/molecules/menu';
import { Game } from '~/components/molecules/game';
import { Record } from '~/components/molecules/record';
import {
  Chevron,
  CurrentViewSpan,
  MenuLink,
  WrapperContainer,
  WrapperTitle,
} from './styled';
import { capitalize } from '~/helpers/capitalize';

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
