import React from 'react';
import { styled } from 'styled-components';

interface Props {
  children?: string;
}
const Error = ({ children }: Props) => {
  return (
    <StyledError style={{ fontSize: '12px', color: 'red' }}>
      {children}
    </StyledError>
  );
};

const StyledError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
export default Error;
