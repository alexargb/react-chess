import React, { createContext } from 'react';
import type { ViewContextState, ViewProviderProps } from './types';
import { useViewState } from './useViewState';

const ViewContext = createContext<ViewContextState>({});

export const ViewProvider = ({ children }: ViewProviderProps) => {
  const state = useViewState();

  return (
    <ViewContext.Provider value={state}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
