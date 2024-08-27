import React from 'react';
import { GameProvider } from '~/contexts/game';
import { Wrapper } from '~/components/organisms/wrapper';

const App = () => (
  <GameProvider>
    <Wrapper />
  </GameProvider>
);

export default App;
