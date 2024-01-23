import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Button } from 'track-1-design-system';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { useVerifyCode } from '../../../../hooks/queries/user';
import { role } from '../../../../recoil/common/role';
import InputForm from '../../../common/Form/inputForm';
import { InputWrapperWithButton, StyledInput } from '../../../common/Input';
import { useEffect } from 'react';
import { EMAIL_MESSAGE, VERIFICATION_CODE_MESSAGE } from '../../../../core/signUp/errorMessage';
import { isProducer } from '../../../../utils/common/check';
import { UserType } from '../../../../type/common/userType';

export default function VerifyCode(props: { confirmedEmail: () => void }) {
  const { confirmedEmail } = props;
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const selectedRole = useRecoilValue<UserType>(role);

  const {
    setError,
    resetField,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const { verifyCode, isSuccess, isError } = useVerifyCode();

  useEffect(() => {
    if (isSuccess) {
      setError('email', { message: EMAIL_MESSAGE.VERIFY });
      setError('verifyCode', { message: VERIFICATION_CODE_MESSAGE.SUCCESS });
      setValue('verifyCode', '');
      resetField('passwordConfirm');
      confirmedEmail();
    }

    if (isError) {
      setError('verifyCode', { message: VERIFICATION_CODE_MESSAGE.ERROR });
      setError('email', { message: EMAIL_MESSAGE.TIME });
    }
  }, [isSuccess, isError]);

  function handleSendVerifyCode() {
    verifyCode({
      userType: isProducer(selectedRole) ? 'producer' : 'vocal',
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
        color={checkIsActive() ? 'white' : 'grey'}
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
