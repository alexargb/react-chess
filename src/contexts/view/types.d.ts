export type ViewName = 'menu' | 'game' | 'record';

export type ViewContextState = {
  currentView?: ViewName;
  setCurrentView?: (view: ViewName) => void;
};

export type ViewProviderProps = {
  children: ReactNode;
};