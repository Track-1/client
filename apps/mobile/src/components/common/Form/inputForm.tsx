import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

interface InputFormProps {
  inputTitle?: string;
  errorMessage?: string;
  suitable?: boolean;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { inputTitle, errorMessage, suitable, children } = props;
  console.log(errorMessage);

  return (
    <div>
      <InputTitle>{inputTitle}</InputTitle>
      <InputWrapper errorMessage={errorMessage}>{children}</InputWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      {suitable && <ErrorText>적절하다!</ErrorText>}
    </div>
  );
}

//common 컴포넌트로 변경예정
const InputTitle = styled.label`
  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.gray2};

  margin-bottom: 0.8rem;
`;

const InputWrapper = styled.div<{ errorMessage?: string }>`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 3.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

  ${(props) =>
    props.errorMessage &&
    css`
      border-color: ${({ theme }) => theme.colors.red};
    `}
`;

const ErrorText = styled.h3`
  position: absolute;

  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.red};

  margin-top: 0.5rem;
`;
