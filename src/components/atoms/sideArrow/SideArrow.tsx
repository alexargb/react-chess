import React from 'react';
import type { SideArrowProps } from './types';
import { SideArrowLeft } from './SideArrowLeft';
import { SideArrowRight } from './SideArrowRight';
import { SideArrowContainer } from './styled';

export const SideArrow = (props: SideArrowProps) => {
  const { left, right, disabled, onClick } = props;

  if (!left && !right) return null;

  return (
    <SideArrowContainer
      $disabled={!!disabled}
      onClick={onClick}
    >
      {left ? (
        <SideArrowLeft {...props} />
      ) : (
        <SideArrowRight {...props} />
      )}
    </SideArrowContainer>
  );
};
