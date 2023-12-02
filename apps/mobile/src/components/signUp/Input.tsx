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
  userType?: string;
  width?: number;
}

export default function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues, TName>) {
  const { name, rules, type, placeholder, width, userType } = props;
  const { field, fieldState } = useController({
    name,
    rules: rules,
  });

  function checkPasswordMessage() {
    return placeholder === "Create a password" || placeholder === "Enter a password again";
  }

  function calculateMarginLeft() {
    if (width === 42.2) {
      return 38;
    } else {
      if (checkPasswordMessage()) {
        return 48;
      } else {
        return 52;
      }
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
          <ErrorMessage color={checkMessageColor(fieldState?.error?.message, userType)}>
            {fieldState.error.message}
            <IconWrapper marginLeft={calculateMarginLeft()}>
              {CheckErrorIcon(fieldState?.error?.message)}
            </IconWrapper>
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

const InputWrapper = styled.input<{ width: number | undefined; color: string | undefined }>`
  /* margin-top: 3rem; */
  padding: 0.5rem 0;

  color: white;

  border-bottom: 1px solid ${({ color }) => color};

  width: ${({ width }) => width}rem;
`;

const ErrorMessage = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
`;

const ErrorMessageWrapper = styled.div`
  margin-top: 1.1rem;
  height: 1.9rem;
`;
