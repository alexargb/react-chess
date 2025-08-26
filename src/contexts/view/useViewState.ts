import { useState } from 'react';

export const useViewState = (): ViewContextState => {
  const [currentView, setCurrentView] = useState<ViewName>('menu');

  return {
    currentView,
    setCurrentView,
  };
};
