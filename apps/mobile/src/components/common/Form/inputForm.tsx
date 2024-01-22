import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { ColorsTypes } from '../../../style/theme';
import { StyledText } from '../Text';
import { UnverifyIc, VerifyIc } from '../../../assets';

interface InputFormProps {
  inputTitle?: string;
  errorMessage?: string;
  stabledMessage?: string;
  stabledColor?: keyof ColorsTypes;
  checkedState?: boolean;
  focusState?: boolean;
}

export default function InputForm(props: PropsWithChildren<InputFormProps>) {
  const { inputTitle, errorMessage, stabledMessage, stabledColor, checkedState, focusState, children } = props;

  function getInputStateIcon() {
    if (errorMessage) return <UnverifyIc />;
    if (checkedState) return <VerifyIc />;
  }

  return (
    <InputContainer>
      <InputTitle>{inputTitle}</InputTitle>
      <InputWrapper errorMessage={errorMessage} stabledColor={stabledColor || 'gray4'}>
        {children}
        {getInputStateIcon()}
      </InputWrapper>
      {errorMessage && (
        <Text as="p" font="Pre_14_R" color="red">
          {errorMessage}
        </Text>
      )}
      {stabledMessage && (
        <Text as="p" font="Pre_14_R" color={stabledColor || 'neon_purple'}>
          {stabledMessage}
        </Text>
      )}
    </InputContainer>
  );
}

//common 컴포넌트로 변경예정
export const InputTitle = styled.label`
  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.gray2};
`;

const InputWrapper = styled.div<{ errorMessage?: string; stabledColor: keyof ColorsTypes }>`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 3.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

  margin-top: 0.8rem;

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

const Text = styled(StyledText)`
  position: absolute;

  margin-top: 0.5rem;
`;

const InputContainer = styled.div`
  width: 100%;

  overflow: hidden;
`;
