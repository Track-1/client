import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Button } from 'track-1-design-system';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { EMAIL_MESSAGE } from '../../../../core/signUp/errorMessage';
import { useUserEmail } from '../../../../hooks/queries/user';
import { role } from '../../../../recoil/common/role';
import { isNextStep } from '../../../../recoil/signUp/isNextStep';
import { checkEmailError, checkEmailForm, checkIsResend } from '../../../../utils/signUp/check';
import { EMAIL_RULE } from '../../../../validation/rules';
import InputForm from '../../../common/Form/inputForm';
import { InputWrapperWithButton, StyledInput } from '../../../common/Input';

export default function Email() {
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const selectedRole = useRecoilValue<string>(role);
  const [, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  const {
    setError,
    resetField,
    getValues,
    formState: { errors },
  } = methods;

  const { sendEmail } = useUserEmail(setError);

  function checkIsActive() {
    return (
      (getValues('email') !== '' && errors?.email?.message === undefined) || checkIsResend(`${errors?.email?.message}`)
    );
  }

  function handleSendCode() {
    sendEmail({
      userType: selectedRole === 'producer' ? 'producer' : 'vocal',
      userEmail: getValues('email'),
    });
  }

  return (
    <InputWrapperWithButton>
      <InputForm
        inputTitle="What’s your email?"
        errorMessage={checkEmailError(`${errors?.email?.message}`) ? `${errors?.email?.message}` : ''}
        stabledMessage={checkIsResend(`${errors?.email?.message}`) ? `${errors?.email?.message}` : ``}
        stabledColor={checkIsResend(`${errors?.email?.message}`) ? 'neon_purple' : 'gray4'}>
        <StyledInput
          {...registerWithRef('email', {
            ...EMAIL_RULE,
            validate: {
              check: (value: string) => {
                resetField('password');
                resetField('verifyCode');
                resetField('passwordConfirm');
                if (!checkEmailForm(value)) {
                  return EMAIL_MESSAGE.FORM;
                } else {
                  setIsSuccess(false);
                }
              },
            },
          })}
          type="text"
          placeholder="Enter your email address"
        />
      </InputForm>
      <Button
        onClick={handleSendCode}
        size="small"
        backgroundColor={checkIsActive() ? 'purple' : 'grey'}
        color={checkIsActive() ? 'black' : 'grey'}
        width={8.6}
        height={3.2}>
        <Styled.ButtonText>{checkIsResend(`${errors?.email?.message}`) ? `Resend` : `Send Code`}</Styled.ButtonText>
      </Button>
    </InputWrapperWithButton>
  );
}

const Styled = {
  ButtonText: styled.p`
    ${({ theme }) => theme.fonts.Alex_10_L};
  `,
};
