import React from 'react';
import { GameProvider } from '~/contexts/game';
import { Wrapper } from '~/components/organisms/wrapper';
import { ViewProvider } from './contexts/view';

const App = () => (
  <GameProvider>
    <ViewProvider>
      <Wrapper />
    </ViewProvider>
  </GameProvider>
);

export default App;
