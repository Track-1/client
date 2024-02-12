import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/queries/user';
import InputForm from '../common/Form/inputForm';
import { StyledInput } from '../common/Input';
import { UserType } from '../../type/common/userType';
import { UserLoginInfo } from '../../type/user';
import SwitchToggle from './switchToggle';
import { PasswordUnVisableIc, PasswordVisableIc } from '../../assets';
import styled from 'styled-components';
import { EMAIL_RULE, PASSWORD_RULE } from '../../validation/rules';
import Text from '../common/Text';
import { ImageWrapper } from '../common/Interface';
import { useForm } from 'react-hook-form';

export default function LoginInput() {
  const [userType, setUserType] = useState<UserType>('vocal');
  const [visiablePw, setVisiablePw] = useState(false);

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<UserLoginInfo>({
    mode: 'onChange',
    defaultValues: {
      userEmail: '',
      userPw: '',
    },
  });

  const { login, error } = useLogin();
  

  useEffect(() => {
    if (error?.response?.data.message === '존재하지 않는 아이디입니다.') {
      setError('userEmail', {
        type: 'value',
        message: 'We don’t have an account with that email address.',
      });
      clearErrors('userPw');
    }

    if (error?.response?.data.message === '잘못된 비밀번호입니다.') {
      setError('userPw', {
        type: 'value',
        message: 'Wrong password.',
      });
      clearErrors('userEmail');
    }
  }, [error]);

  useEffect(() => {
    clearErrors('userPw');
    clearErrors('userEmail');
  }, [userType]);

  function handleLogin() {
    login({
      userEmail: getValues('userEmail'),
      userPw: getValues('userPw'),
      userType: userType,
    });
  }

  function switchUserType() {
    userType === 'producer' ? setUserType('vocal') : setUserType('producer');
  }

  function handleChangeVisiableState() {
    setVisiablePw(!visiablePw);
  }

  function getButtonState() {
    return !errors.userEmail && !errors.userPw && getValues('userPw').length > 0;
  }

  return (
    <>
      <InputFormWrapper>
        <InputForm inputTitle="Email" errorMessage={errors.userEmail?.message}>
          <StyledInput
            type="text"
            placeholder="Enter your email address"
            {...register('userEmail', {
              ...EMAIL_RULE,
            })}
          />
        </InputForm>

        <InputForm inputTitle="Password" errorMessage={errors.userPw?.message}>
          <StyledInput
            type={visiablePw ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('userPw', {
              ...PASSWORD_RULE,
            })}
          />
          <ImageWrapper as="button" width={3} height={3} onClick={handleChangeVisiableState}>
            {visiablePw ? <PasswordUnVisableIc /> : <PasswordVisableIc />}
          </ImageWrapper>
        </InputForm>
      </InputFormWrapper>

      <SwitchToggle switchUserType={switchUserType} width={4.6} height={2.2} />

      <ButtonWrapper>
        {/* 버튼에 gray5컬러가 없어요..!! */}
        {/* <Button size="large" backgroundColor="purple"> */}
        {/* 이거 왜 모바일에서는 클릭이 안되냐...? */}
        <StyledButton state={getButtonState()} onClick={handleLogin} onTouchStart={handleLogin}>
          <Text as="span" font="Alex_16_R" color="white">
            Log in
          </Text>
        </StyledButton>
        {/* </Button> */}
      </ButtonWrapper>
    </>
  );
}

const InputFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  margin: 4rem 0 2rem;

  cursor: pointer;
`;

const StyledButton = styled.button<{ state: boolean }>`
  width: 100%;
  height: 5.2rem;

  border-radius: 2.6rem;
  background-color: ${(props) =>
    props.state ? ({ theme }) => theme.colors.neon_purple : ({ theme }) => theme.colors.gray5};

  cursor: pointer;
`;
