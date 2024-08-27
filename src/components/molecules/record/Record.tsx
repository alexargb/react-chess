import React from 'react';
import { useGameContext, useViewContext } from '~/hooks';
import { ColourSpan, IdSpan, RecordList, RecordWrapper } from './styled';
import { ListItem } from '~/components/atoms/list';
import { getOppositeColour } from '~/engine/game/helpers';
import { capitalize } from '~/helpers/capitalize';

export const Record = () => {
  const { currentView, setCurrentView } = useViewContext();
  const { record, setCurrentGame } = useGameContext();

  return (
    <RecordWrapper $visible={currentView === 'record'} className="record">
      <RecordList>
        {record.map((game) => {
          if (!game) return null;
          const { id, turn, finished } = game;
          const onClickRecord = () => {
            setCurrentGame?.(game);
            setCurrentView?.('game');
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
      </RecordList>
    </RecordWrapper>
  );
};
