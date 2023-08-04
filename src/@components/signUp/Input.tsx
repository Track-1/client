import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import styled from "styled-components";
import { checkInputUnderline, checkMessageColor } from "../../utils/signUp/inputStyle";
import CheckErrorIcon from "./checkErrorIcon";

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  type?: string;
  placeholder?: string;
  width: number;
}

export default function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues, TName>) {
  const { name, rules, type, placeholder, width } = props;
  const { field, fieldState } = useController({
    name,
    rules: rules,
  });

  function calculateMarginLeft() {
    if (width === 42.2) {
      return 38;
    } else {
      return 48;
    }
  }

  return (
    <InputContainer>
      <InputWrapper
        {...field}
        type={type}
        placeholder={placeholder}
        width={width}
        autoComplete="off"
        color={checkInputUnderline(fieldState?.error?.message)}
      />
      <ErrorMessageWrapper>
        {fieldState?.error && (
          <ErrorMessage color={checkMessageColor(fieldState?.error?.message)}>
            {fieldState.error.message}
            <IconWrapper marginLeft={calculateMarginLeft()}>{CheckErrorIcon(fieldState?.error?.message)}</IconWrapper>
          </ErrorMessage>
        )}
      </ErrorMessageWrapper>
    </InputContainer>
  );
}

const IconWrapper = styled.div<{ marginLeft: number }>`
  margin: -7.5rem 0 0 ${({ marginLeft }) => marginLeft}rem;
`;

const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.input<{ width: number; color: string | undefined }>`
  margin-top: 3rem;
  padding: 0.5rem 0;

  color: white;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};

  width: ${({ width }) => width}rem;

  ${({ theme }) => theme.fonts.input}

  &:focus {
    border-bottom: 1px solid ${({ color }) => color};
  }
`;

const ErrorMessage = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  ${({ theme }) => theme.fonts.message};
`;

const ErrorMessageWrapper = styled.div`
  margin-top: 1.1rem;
  height: 1.9rem;
`;
