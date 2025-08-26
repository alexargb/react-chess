import { Wrapper } from '~/components/organisms/wrapper';
import { GameProvider } from '~/contexts/game';

import { ViewProvider } from './contexts/view';

const App = () => (
  <GameProvider>
    <ViewProvider>
      <Wrapper />
    </ViewProvider>
  </GameProvider>
);

export default App;
