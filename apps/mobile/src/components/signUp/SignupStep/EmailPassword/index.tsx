import { FormProvider } from 'react-hook-form';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import Email from './Email';

export default function EmailPassword() {
  const methods = useFormWithRef({
    defaultValues: { email: '', verifyCode: '', password: '', passwordConfirm: '' },
    mode: 'onChange',
  });

  function handleSubmitEmailPassword() {}

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmitEmailPassword)}>
          <Email />
        </form>
      </FormProvider>
    </>
  );
}
