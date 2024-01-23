import { FormProvider } from 'react-hook-form';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import { checkEmailSuccess, checkIsResend } from '../../../../utils/signUp/check';

import Email from './Email';
import Password from './Password';
import PasswordConfirm from './PasswordConfirm';
import VerifyCode from './VerifyCode';
import styled from 'styled-components';
import { useState } from 'react';

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

  const [checkedEmail, setCheckedEmail] = useState(false);

  function confirmedEmail() {
    setCheckedEmail(true);
  }

  return (
    <>
      <FormProvider {...methods}>
        <FormContainer onSubmit={handleSubmit(handleSubmitEmailPassword)}>
          <Email checkedEmail={checkedEmail} />
          {checkIsResend(errors?.email?.message) && <VerifyCode confirmedEmail={confirmedEmail} />}
          {checkEmailSuccess(`${errors?.verifyCode?.message}`, `${errors?.email?.message}`) && (
            <>
              <Password />
              <PasswordConfirm />
            </>
          )}
        </FormContainer>
      </FormProvider>
    </>
  );
}

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
`;
