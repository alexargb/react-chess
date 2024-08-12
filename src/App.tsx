import React from 'react';
import { Wrapper } from '~/components/organisms/wrapper';
import { GameProvider } from '~/contexts/game';

const App = () => (
  <GameProvider>
    <Wrapper />
  </GameProvider>
);

export default App;
