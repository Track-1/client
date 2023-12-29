import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import Text, { StyledText } from '../Text';
import { ColorsTypes } from '../../../style/theme';

interface InputFormProps {
  inputTitle?: string;
  errorMessage?: string;
  stabledMessage?: string;
  stabledColor?: keyof ColorsTypes;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { inputTitle, errorMessage, stabledMessage, stabledColor, children } = props;

  return (
    <div>
      <InputTitle>{inputTitle}</InputTitle>
      <InputWrapper errorMessage={errorMessage} stabledColor={stabledColor || 'gray4'}>
        {children}
      </InputWrapper>
      {errorMessage && (
        <ErrorText as="p" font="Pre_14_R" color="red">
          {errorMessage}
        </ErrorText>
      )}
      {stabledMessage && (
        <Text as="p" font="Pre_14_R" color={stabledColor || 'neon_purple'}>
          {stabledMessage}
        </Text>
      )}
    </div>
  );
}

//common 컴포넌트로 변경예정
const InputTitle = styled.label`
  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.gray2};

  margin-bottom: 0.8rem;
`;

const InputWrapper = styled.div<{ errorMessage?: string; stabledColor: keyof ColorsTypes }>`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 3.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

  ${(props) =>
    props.stabledColor &&
    css`
      border-color: ${({ theme }) => theme.colors[props.stabledColor]};
    `}

  ${(props) =>
    props.errorMessage &&
    css`
      border-color: ${({ theme }) => theme.colors.red};
    `}
`;

const ErrorText = styled(StyledText)`
  position: absolute;

  margin-top: 0.5rem;
`;
