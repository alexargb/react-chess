import { useState } from 'react';
import { ViewContextState, ViewName } from './types';

export const useViewState = (): ViewContextState => {
  const [currentView, setCurrentView] = useState<ViewName>('menu');

  return {
    currentView,
    setCurrentView,
  };
};
