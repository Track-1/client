import styled from 'styled-components';
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
    formState: { errors },
  } = methods;

  return (
    <Style.NicknameLayout>
      <InputForm inputTitle="What’s your name?" errorMessage={errors.nickName?.message}>
        <StyledInput
          type="text"
          placeholder="Enter your user name"
          {...registerWithRef('nickName', {
            ...NICKNAME_RULE,
          })}
        />
      </InputForm>
    </Style.NicknameLayout>
  );
}

const Style = {
  NicknameLayout: styled.div`
    width: 100%;
  `,
};