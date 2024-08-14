import React, { useState } from 'react';
import { MENU, GAME, RECORD } from '~/constants/views';
import { Menu } from '~/components/molecules/menu';
import { Game } from '~/components/organisms/game';
import { Record } from '~/components/molecules/record';
import { WrapperContainer, WrapperTitle } from './styled';

export const Wrapper = () => {
  const [currentView, setCurrentView] = useState(MENU);
  const returnToMenu = () => setCurrentView(MENU);

  return (
    <WrapperContainer>
      <WrapperTitle onClick={returnToMenu}>React Chess</WrapperTitle>
      { currentView === MENU && <Menu setCurrentView={setCurrentView} /> }
      { currentView === GAME && <Game /> }
      { currentView === RECORD && <Record /> }
    </WrapperContainer>
  );
};
