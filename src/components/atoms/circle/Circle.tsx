import React from 'react';
import { CircleDiv, type CircleProps } from './styled';

export const Circle = ({ $radius, $colour }: CircleProps) => (
  <CircleDiv $radius={$radius} $colour={$colour}>-</CircleDiv>
);
