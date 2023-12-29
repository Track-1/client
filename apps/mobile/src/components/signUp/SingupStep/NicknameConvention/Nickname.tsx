import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import { NICKNAME_RULE } from '../../../../validation/rules';
import InputForm from '../../../common/Form/inputForm';
import { StyledInput } from '../../../common/Input';

export default function Nickname() {
  const { registerWithRef, ...methods } = useFormWithRef({
    defaultValues: {
      nickName: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  return (
    <InputForm inputTitle="What’s your name?" errorMessage={errors.nickName?.message}>
      <StyledInput
        type="text"
        placeholder="Enter your user name"
        {...registerWithRef('nickName', {
          ...NICKNAME_RULE,
        })}
      />
    </InputForm>
  );
}
