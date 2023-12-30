import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import Convention from './Convention';
import Nickname from './Nickname';
import ProfilImageContainer from './ProfileImageContainer';

export default function NicknameConvention() {
  const methods = useFormWithRef({
    defaultValues: {
      nickName: '',
    },
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <Styled.NicknameConventionWrapper>
        <ProfilImageContainer />
        <Nickname />
        <Convention />
      </Styled.NicknameConventionWrapper>
    </FormProvider>
  );
}

const Styled = {
  NicknameConventionWrapper: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
};
