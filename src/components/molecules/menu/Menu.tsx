import React from 'react';
import { List, ListItem } from '~/components/atoms/list';
import { GAME, RECORD } from '~/constants/views';
import { useGameContext } from '~/hooks';

type MenuProps = {
  setCurrentView: (view: string) => void;
};

export const Menu = ({ setCurrentView }: MenuProps) => {
  const { currentGame, createNewGame, record } = useGameContext();
  const showContinue = !!currentGame;
  const showRecord = record?.length > 1;
  
  const goToGame = () => setCurrentView(GAME);
  const goToRecord = () => setCurrentView(RECORD);

  const newGame = () => {
    createNewGame();
    goToGame();
  };

  return (
    <List className="menu">
      { showContinue && <ListItem onClick={goToGame}>Continue Game</ListItem> }
      <ListItem onClick={newGame}>New Game</ListItem>
      {showRecord && <ListItem onClick={goToRecord}>Record</ListItem>}
    </List>
  );
};
