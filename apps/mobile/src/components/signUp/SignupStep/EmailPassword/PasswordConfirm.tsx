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
  checkPasswordForm,
  checkPasswordMatch,
} from '../../../../utils/signUp/check';
import InputForm from '../../../common/Form/inputForm';
import { StyledInput } from '../../../common/Input';
import { PasswordUnVisibleIcon, PasswordVisibleIcon } from '../../../common/Input/icons';

export default function PasswordConfirm() {
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const [, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [visiblePw, setVisiblePw] = useState(false);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);

  const {
    getValues,
    formState: { errors },
  } = methods;

  function handleShowVisible() {
    setVisiblePw((visible) => !visible);
  }

  return (
    <Styled.PasswordConfirmInput>
      <InputForm
        inputTitle="Confirm Password"
        errorMessage={
          errors?.passwordConfirm?.message && !checkPasswordMatch(getValues('password'), getValues('passwordConfirm'))
            ? `${errors?.passwordConfirm?.message}`
            : ''
        }>
        <StyledInput
          type={visiblePw ? 'text' : 'password'}
          placeholder="Enter a password again"
          {...registerWithRef('passwordConfirm', {
            required: true,
            validate: {
              check: (value) => {
                if (!checkInputEmpty(value)) {
                  if (!checkPasswordMatch(getValues('password'), value)) {
                    setIsSuccess(false);
                    return PASSWORD_MESSAGE.MATCH;
                  } else {
                    if (checkPasswordForm(getValues('password'))) {
                      if (checkEmailVerifyOKToSuccess(`${errors.email?.message}`)) {
                        setIsSuccess(true);
                        setUserData({ ...userData, userEmail: getValues('email'), userPw: getValues('password') });
                      }
                      return PASSWORD_MESSAGE.SUCCESS;
                    }
                  }
                }
              },
            },
          })}
        />
        <div onClick={handleShowVisible}>{visiblePw ? <PasswordUnVisibleIcon /> : <PasswordVisibleIcon />}</div>
      </InputForm>
    </Styled.PasswordConfirmInput>
  );
}

const Styled = {
  PasswordConfirmInput: styled.div`
    margin-top: 7rem;
  `,
};
