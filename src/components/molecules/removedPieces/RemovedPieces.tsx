import { useMemo } from 'react';

import { Piece } from '~/components/atoms/piece';
import { useGameContext } from '~/hooks';

import { RemovedPiecesList, RemovedPiecesListItem } from './styled';

type RemovedPiecesProps = {
  colour: ChessColour;
};

export const RemovedPieces = ({ colour }: RemovedPiecesProps) => {
  const { currentGame } = useGameContext();
  const pieces = useMemo(
    () => currentGame?.removedPieces[colour] || [],
    [currentGame?.removedPieces[colour].length],
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

