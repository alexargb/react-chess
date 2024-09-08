import { useEffect, useState } from 'react';

export const useOverflowHidden = (visible: boolean): boolean => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!visible && !hidden) {
      setHidden(true);
    } else if (visible && hidden) {
      setTimeout(() => {
        setHidden(false);
      }, 350);
    }
  }, [visible]);

  return hidden;
}
