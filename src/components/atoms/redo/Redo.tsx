import React from 'react';

type RedoProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const Redo = ({ onClick, disabled }: RedoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4vw"
    height="4vw"
    x="0"
    y="0"
    viewBox="0 0 48 48"
    onClick={onClick}
  >
    <path
      fill={disabled ? 'gray' : 'white'}
      d="M19.607 6.014c-3.23 0-6.46 1.226-8.914 3.68-4.906 4.906-4.906 12.921 0 17.827l14.893 14.893a2 2 0 102.828-2.828L13.521 24.693a8.577 8.577 0 010-12.172 8.577 8.577 0 0112.172 0L34.172 21H26a2 2 0 100 4h13a2 2 0 002-2V10a2 2 0 00-2.03-2.027A2 2 0 0037 10v8.172l-8.479-8.479a12.567 12.567 0 00-8.914-3.68z"
    />
  </svg>
);
