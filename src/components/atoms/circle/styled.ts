import styled from 'styled-components';

export type CircleProps = {
  radius: number,
  colour: string,
};

export const CircleDiv = styled.div<CircleProps>`
  width: ${({ radius }) => radius * 2}px;
  height: ${({ radius }) => radius * 2}px;
  border-radius: ${({ radius }) => radius}px;

  background-color: ${({ colour }) => colour};
  color: ${({ colour }) => colour};

  text-decoration: none;
  font-size: 0;
`;
