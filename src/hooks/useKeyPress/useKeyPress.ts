import { useEffect } from 'react';

type UseKeyPressCbArg = {
  ctrl: boolean;
  key: string;
};
export type UseKeyPressCb = (arg: UseKeyPressCbArg) => void;

export const useKeyPress = (callback: UseKeyPressCb, deps?: any[]) => {
  const keyPressHandler = (event: KeyboardEvent) => {
    callback({
      ctrl: event.ctrlKey,
      key: event.key,
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, deps || []);
};
