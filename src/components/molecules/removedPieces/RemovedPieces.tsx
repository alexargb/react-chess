import React, { useMemo } from 'react';
import type { ChessColour } from '~/types';
import { useGameContext } from '~/hooks';
import { getPiecesByColour } from '~/engine/game/helpers';
import { Piece } from '~/components/atoms/piece';
import { RemovedPiecesList, RemovedPiecesListItem } from './styled';

type RemovedPiecesProps = {
  colour: ChessColour;
};

export const RemovedPieces = ({ colour }: RemovedPiecesProps) => {
  const { currentGame } = useGameContext();
  const pieces = useMemo(
    () => getPiecesByColour(currentGame?.removedPieces || [], colour),
    [currentGame?.removedPieces.length],
  );
  const shouldShowBorder = useMemo(() => {
    if (!currentGame || currentGame.finished) return false;
    return currentGame.turn === colour;
  }, [currentGame?.finished, currentGame?.turn]);

  return (
    <RemovedPiecesList
      $colour={colour}
      $showBorder={shouldShowBorder}
      role="removed-pieces-list"
    >
      {pieces.map((piece) => (
        <RemovedPiecesListItem key={piece.id}>
          <Piece piece={piece} size="small" />
        </RemovedPiecesListItem>
      ))}
    </RemovedPiecesList>
  );
};

