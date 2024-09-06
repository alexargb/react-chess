import React from 'react';
import { useGameContext, useViewContext } from '~/hooks';
import { ListItem } from '~/components/atoms/list';
import { MenuList } from './styled';

export const Menu = () => {
  const { currentView, setCurrentView } = useViewContext();
  const { currentGame, createNewGame, record } = useGameContext();
  const showContinue = !!currentGame && !currentGame.finished;
  const showRecord = record?.length > 1 || record?.[0]?.finished;
  
  const goToGame = () => setCurrentView?.('game');
  const goToRecord = () => setCurrentView?.('record');

  const newGame = () => {
    createNewGame();
    goToGame();
  };

  return (
    <MenuList $visible={currentView === 'menu'} className="menu">
      {showContinue && <ListItem onClick={goToGame}>Continue Game</ListItem>}
      <ListItem onClick={newGame}>New Game</ListItem>
      {showRecord && <ListItem onClick={goToRecord}>Record</ListItem>}
    </MenuList>
  );
};
