type ViewName = 'menu' | 'game' | 'record';

type ViewContextState = {
  currentView?: ViewName;
  setCurrentView?: (view: ViewName) => void;
};

type ViewProviderProps = {
  children: ReactNode;
};