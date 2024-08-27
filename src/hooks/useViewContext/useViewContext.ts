import { useContext } from 'react';
import ViewContext from '~/contexts/view';

export const useViewContext = () => useContext(ViewContext);
