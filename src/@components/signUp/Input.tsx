import { FieldError, FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import styled from "styled-components";

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

  function checkIsError(error: FieldError | undefined) {
    return error !== undefined;
  }

  return (
    <InputContainer>
      <InputWrapper
        {...field}
        type={type}
        placeholder={placeholder}
        isError={checkIsError(fieldState.error)}
        width={width}
      />
      <ErrorMessage> {fieldState.error && fieldState.error.message}</ErrorMessage>
    </InputContainer>
  );
}

const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.input<{ isError: boolean; width: number }>`
  margin-top: 3rem;
  padding: 0.5rem 0;

  color: white;

  border-bottom: 1px solid ${({ theme, isError }) => (isError ? theme.colors.red : theme.colors.white)};

  width: ${({ width }) => width}rem;

  ${({ theme }) => theme.fonts.input}
`;

const ErrorMessage = styled.p`
  margin-top: 1.1rem;
  height: 1.9rem;

  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.message};
`;
