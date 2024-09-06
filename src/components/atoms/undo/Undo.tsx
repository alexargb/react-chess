import React from 'react';

type UndoProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const Undo = ({ onClick, disabled }: UndoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="5vh"
    height="5vh"
    x="0"
    y="0"
    viewBox="0 0 48 48"
    onClick={onClick}
  >
    <path
      fill={disabled ? 'gray' : 'white'}
      d="M28.393 6.014c-3.23 0-6.461 1.226-8.914 3.68L11 18.171V10a2 2 0 00-2.03-2.027A2 2 0 007 10v13a2 2 0 002 2h13a2 2 0 100-4h-8.172l8.479-8.479a8.577 8.577 0 0112.172 0 8.577 8.577 0 010 12.172L19.586 39.586a2 2 0 102.828 2.828l14.893-14.893c4.906-4.906 4.906-12.921 0-17.828a12.567 12.567 0 00-8.914-3.68z"
    />
  </svg>
);
