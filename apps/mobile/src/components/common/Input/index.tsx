import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface InputProps {}

export default function Input(props: PropsWithChildren<InputProps>) {
  const { children } = props;
  return <InputWrapper>{children}</InputWrapper>;
}

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 3.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;

  padding: 1rem 0;

  ${({ theme }) => theme.fonts.Pre_16_R};
  color: ${({ theme }) => theme.colors.white};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
