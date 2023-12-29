import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Button } from 'track-1-design-system';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { useVerifyCode } from '../../../../hooks/queries/user';
import { role } from '../../../../recoil/common/role';
import InputForm from '../../../common/Form/inputForm';
import { InputWrapperWithButton, StyledInput } from '../../../common/Input';

export default function VerifyCode() {
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const selectedRole = useRecoilValue<string>(role);

  const {
    setError,
    resetField,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const { verifyCode } = useVerifyCode(setError, resetField, setValue);

  function handleSendVerifyCode() {
    verifyCode({
      userType: selectedRole === 'producer' ? 'producer' : 'vocal',
      userEmail: getValues('email'),
      userCode: getValues('verifyCode'),
    });
  }

  function checkIsActive() {
    return watch('verifyCode') !== '';
  }

  return (
    <Styled.InputWrapper>
      <InputForm
        inputTitle="Verification Code"
        errorMessage={errors?.verifyCode?.message ? `${errors?.verifyCode?.message}` : ''}>
        <StyledInput {...registerWithRef('verifyCode', {})} type="text" placeholder="Verify your email address" />
      </InputForm>
      <Button
        onClick={handleSendVerifyCode}
        size="small"
        backgroundColor={checkIsActive() ? 'purple' : 'grey'}
        color={checkIsActive() ? 'black' : 'grey'}
        width={8.6}
        height={3.2}>
        <Styled.ButtonText>Verify</Styled.ButtonText>
      </Button>
    </Styled.InputWrapper>
  );
}

const Styled = {
  ButtonText: styled.p`
    ${({ theme }) => theme.fonts.Alex_10_L};
  `,
  InputWrapper: styled(InputWrapperWithButton)`
    margin-top: 5.2rem;
  `,
};
