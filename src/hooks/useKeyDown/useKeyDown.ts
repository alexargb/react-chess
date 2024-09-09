import { useEffect } from 'react';

type UseKeyDownCbArg = {
  ctrl: boolean;
  key: string;
};
export type UseKeyDownCb = (arg: UseKeyDownCbArg) => void;

export const useKeyDown = (callback: UseKeyDownCb, deps?: any[]) => {
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
