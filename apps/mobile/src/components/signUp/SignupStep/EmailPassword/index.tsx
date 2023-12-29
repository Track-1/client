import { FormProvider } from 'react-hook-form';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import { checkIsResend } from '../../../../utils/signUp/check';
import Email from './Email';
import VerifyCode from './VerifyCode';

export default function EmailPassword() {
  const methods = useFormWithRef({
    defaultValues: { email: '', verifyCode: '', password: '', passwordConfirm: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  function handleSubmitEmailPassword() {}

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitEmailPassword)}>
          <Email />
          {checkIsResend(errors?.email?.message) && <VerifyCode />}
        </form>
      </FormProvider>
    </>
  );
}
