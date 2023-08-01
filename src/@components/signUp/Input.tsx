import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import styled from "styled-components";

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  type?: string;
  placeholder?: string;
}

export default function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues, TName>) {
  const { name, rules, type, placeholder } = props;
  const { field, fieldState } = useController({
    name,
    rules: rules,
  });

  return (
    <>
      <InputWrapper {...field} type={type} placeholder={placeholder} />
      {fieldState.error && fieldState.error.message}
    </>
  );
}

const InputWrapper = styled.input`
  color: white;
  border-bottom: 1px solid white;

  width: 45rem;
`;
