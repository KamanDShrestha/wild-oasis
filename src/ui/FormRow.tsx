import React, { ReactElement, ReactNode } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

import { styled } from 'styled-components';
import Error from './Error';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

interface Props {
  label?: string;
  child?: ReactElement;
  children: ReactNode;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const FormRow = ({ label, child, children, error }: Props) => {
  //   if (!label) {
  //     return <StyledFormRow>{children}</StyledFormRow>;
  //   }
  return (
    <StyledFormRow>
      <Label htmlFor={child?.props.id as string}>{label}</Label>
      {children}

      {error?.type && <Error>{error.message as string}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
