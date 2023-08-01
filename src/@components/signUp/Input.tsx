import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import styled from "styled-components";

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  type?: string;
  placeholder?: string;
  title?: string;
}

export default function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues, TName>) {
  const { name, rules, type, placeholder, title } = props;
  const { field, fieldState } = useController({
    name,
    rules: rules,
  });

  return (
    <>
      <h1>{title}</h1>
      <InputWrapper {...field} type={type} placeholder={placeholder} />
      <ErrorMessage> {fieldState.error && fieldState.error.message}</ErrorMessage>
    </>
  );
}

const InputWrapper = styled.input`
  color: white;
  border-bottom: 1px solid white;

  width: 45rem;
`;

const ErrorMessage = styled.p`
  margin-top: 1.1rem;
  height: 1.9rem;
`;
