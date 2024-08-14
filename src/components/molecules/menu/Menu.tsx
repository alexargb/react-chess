import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { List, ListItem } from '~/components/atoms/list';
import { GAME, RECORD } from '~/constants/views';
import { useGameContext } from '~/hooks';

type MenuProps = {
  setCurrentView: Dispatch<SetStateAction<string>>;
};

export const Menu = ({ setCurrentView }: MenuProps) => {
  const { currentGame, createNewGame } = useGameContext();
  const showContinue = !!currentGame;
  
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
      <ListItem onClick={goToRecord}>Record</ListItem>
    </List>
  );
};
