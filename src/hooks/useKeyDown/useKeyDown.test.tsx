import type { UseKeyDownCb } from '.';
import { render, waitFor } from '@testing-library/react';
import { useKeyDown } from './useKeyDown';

const MockComponent = ({ callbackMock }: { callbackMock: UseKeyDownCb }) => {
  useKeyDown(callbackMock);
  return (
    <div>
      Mock Component
    </div>
  );
};

describe('useKeyDown', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should listen to Ctrl+Z correctly', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const callbackMock = jest.fn();

    const renderedComponent = render(<MockComponent callbackMock={callbackMock} />);
    await waitFor(() => {
      expect(addEventListenerSpy).toHaveBeenCalled();
    });

    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    }));

    await waitFor(() => {
      expect(callbackMock).toHaveBeenCalledWith({
        ctrl: true,
        key: 'z',
      });
    });

    renderedComponent.unmount();
    await waitFor(() => {
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });
  });
});
