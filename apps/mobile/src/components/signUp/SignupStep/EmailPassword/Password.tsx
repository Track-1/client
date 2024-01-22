import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { PASSWORD_MESSAGE } from '../../../../core/signUp/errorMessage';
import { isNextStep } from '../../../../recoil/signUp/isNextStep';
import { joinUserData } from '../../../../recoil/signUp/joinUserData';
import { JoinUserDataPropsType } from '../../../../type/signUp/joinUserDataType';
import {
  checkEmailVerifyOKToSuccess,
  checkInputEmpty,
  checkPasswordError,
  checkPasswordForm,
  checkPasswordMatch,
} from '../../../../utils/signUp/check';
import InputForm from '../../../common/Form/inputForm';
import { StyledInput } from '../../../common/Input';
import { PasswordUnVisibleIcon, PasswordVisibleIcon } from '../../../common/Input/icons';

export default function Password() {
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const [, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [visiblePw, setVisiblePw] = useState(false);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);

  const {
    setError,
    getValues,
    formState: { errors },
  } = methods;

  function handleShowVisible() {
    setVisiblePw((visible) => !visible);
  }

  return (
    <Styled.PasswordInput>
      <InputForm
        inputTitle="Password"
        errorMessage={checkPasswordError(`${errors?.password?.message}`) ? `${errors?.password?.message}` : ''}
        checkedState={errors.password?.message === 'password success'}>
        <StyledInput
          type={visiblePw ? 'text' : 'password'}
          placeholder="Create a password"
          {...registerWithRef('password', {
            required: true,
            validate: {
              check: (value) => {
                if (!checkInputEmpty(getValues('passwordConfirm'))) {
                  if (!checkPasswordMatch(getValues('passwordConfirm'), value)) {
                    setError('passwordConfirm', { message: PASSWORD_MESSAGE.MATCH });
                    setIsSuccess(false);
                  } else {
                    if (checkPasswordForm(value)) {
                      setError('passwordConfirm', { message: PASSWORD_MESSAGE.SUCCESS });
                      if (checkEmailVerifyOKToSuccess(`${errors.email?.message}`)) {
                        setIsSuccess(true);
                        setUserData({ ...userData, userEmail: getValues('email'), userPw: getValues('password') });
                      }
                    }
                  }
                }
                if (checkPasswordForm(value)) {
                  return PASSWORD_MESSAGE.SUCCESS;
                } else {
                  if (!checkInputEmpty(value)) {
                    return PASSWORD_MESSAGE.FORM;
                  }
                  setIsSuccess(false);
                }
              },
            },
          })}
        />
        <div onClick={handleShowVisible}>{visiblePw ? <PasswordUnVisibleIcon /> : <PasswordVisibleIcon />}</div>
      </InputForm>
    </Styled.PasswordInput>
  );
}

const Styled = {
  PasswordInput: styled.div`
    margin-top: 5rem;
  `,
};
