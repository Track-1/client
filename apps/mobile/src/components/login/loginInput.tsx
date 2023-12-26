import { useState } from 'react';
import { useLogin } from '../../hooks/queries/user';
import InputForm from '../common/Form/inputForm';
import { StyledInput } from '../common/Input';
import { UserType } from '../../type/common/userType';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import { UserLoginInfo } from '../../type/user';
import SwitchToggle from './switchToggle';
import { PasswordActiveIc } from '../../assets';
import styled from 'styled-components';
import { EMAIL_RULE } from '../../validation/rules';

export default function LoginInput() {
  const [userType, setUserType] = useState<UserType>('vocal');

  const { registerWithRef, ...methods } = useFormWithRef<UserLoginInfo>({
    userEmail: '',
    userPw: '',
    userType: 'vocal',
  });

  function switchUserType() {
    userType === 'producer' ? setUserType('vocal') : setUserType('producer');
  }

  const { login, data, isError, error } = useLogin();

  function handleLogin() {
    login({
      userEmail: methods.getValues('userEmail'),
      userPw: methods.getValues('userPw'),
      userType: userType,
    });
  }

  return (
    <>
      <InputFormWrapper>
        <InputForm inputTitle="Email">
          <StyledInput
            type="text"
            placeholder="Enter your email address"
            {...registerWithRef('userEmail', {
              ...EMAIL_RULE,
            })}
          />
        </InputForm>

        <InputForm inputTitle="Password">
          <StyledInput type="password" placeholder="Enter your password" {...registerWithRef('userPw', {})} />
          <PasswordActiveIcon />
        </InputForm>
      </InputFormWrapper>

      <SwitchToggle switchUserType={switchUserType} width={4.6} height={2.2} />

      <ButtonWrapper>
        <button style={{ background: 'orange' }} onClick={handleLogin}>
          로그인
        </button>
      </ButtonWrapper>
    </>
  );
}

const InputFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin-bottom: 2rem;
`;

const PasswordActiveIcon = styled(PasswordActiveIc)`
  width: 3rem;
  height: 3rem;
`;

const ButtonWrapper = styled.div`
  margin: 4rem 0 2rem;
`;
