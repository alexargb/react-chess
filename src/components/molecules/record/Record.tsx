import React from 'react';
import { useGameContext } from '~/hooks';
import { ColourSpan, IdSpan, RecordTitle, RecordWrapper } from './styled';
import { List, ListItem } from '~/components/atoms/list';
import { getOppositeColour } from '~/engine/game/helpers';
import { capitalize } from '~/helpers/capitalize';
import { GAME } from '~/constants/views';

type RecordProps = {
  setCurrentView: (view: string) => void;
};

export const Record = ({ setCurrentView }: RecordProps) => {
  const { record, setCurrentGame } = useGameContext();
  return (
    <RecordWrapper className="record">
      <RecordTitle>Record:</RecordTitle>
      <List>
        {record.map((game) => {
          if (!game) return null;
          const { id, turn, finished } = game;
          const onClickRecord = () => {
            setCurrentGame?.(game);
            setCurrentView(GAME);
          };

          return (
            <ListItem onClick={onClickRecord} key={id}>
              <IdSpan>{id}</IdSpan> {
                finished ? (
                  <>
                    <ColourSpan $colour={getOppositeColour(turn)}>
                      {capitalize(getOppositeColour(turn))}
                    </ColourSpan> won!
                  </>
                ) : (
                  <>
                    <ColourSpan $colour={turn}>
                      {capitalize(turn)}'s
                    </ColourSpan> turn
                  </>
                )
              }
            </ListItem>
          );
        })}
      </List>
    </RecordWrapper>
  );
};
