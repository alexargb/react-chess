import React from 'react';
import type { ViewContextState } from '~/contexts/view/types';
import { useViewContext } from '.';

const mockContextState: ViewContextState = {
  currentView: 'menu',
  setCurrentView: jest.fn(),
};

describe('useViewContext', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should return state correctly', () => {
    const useContextSpy = jest.spyOn(React, 'useContext').mockImplementation(() => mockContextState);

    const result = useViewContext();

    expect(useContextSpy).toHaveBeenCalled();
    expect(result.currentView).toBe('menu');

    result.setCurrentView?.('game');
    expect(mockContextState.setCurrentView).toHaveBeenCalled();
  });
});
