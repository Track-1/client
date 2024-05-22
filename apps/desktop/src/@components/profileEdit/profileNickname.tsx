import styled from 'styled-components';
import InputContainer from '../@common/form/inputContainer';
import { useFormContext } from 'react-hook-form';
import { ProfileInfoInputType } from '../../type/profile';
import { CHECK_NICKNAME_FORM } from '../../core/signUp/checkForm';
import { NICKNAME_MESSAGE } from '../../core/signUp/errorMessage';
import { InputContainer200 } from '../@common/layout/styledComponents';
import { SignupErrorIc, SignupVerifyIc } from '../../assets';

export default function ProfileNickname() {
  const {
    register,
    formState: { errors, isValid, dirtyFields },
  } = useFormContext<ProfileInfoInputType, any, undefined>();

  return (
    <InputContainer title="Name" isRequired>
      <InpurWrapper isValid={isValid} isDirty={dirtyFields.nickName ?? false}>
        <NickNameInput
          type="text"
          placeholder="Enter your user name"
          {...register('nickName', {
            pattern: {
              value: CHECK_NICKNAME_FORM,
              message: NICKNAME_MESSAGE.ERROR,
            },
            required: true,
          })}
        />
        {dirtyFields.nickName && (isValid ? <SignupVerifyIcon /> : <SignupErrorIcon />)}
      </InpurWrapper>
      <ErrorMessage>{errors.nickName?.message}</ErrorMessage>
    </InputContainer>
  );
}

const InpurWrapper = styled.div<{ isValid: boolean; isDirty: boolean }>`
  display: flex;

  border-bottom: 0.1rem solid
    ${({ theme, isValid, isDirty }) =>
      isDirty ? (isValid ? theme.colors.main : theme.colors.red) : theme.colors.white};
`;

const NickNameInput = styled(InputContainer200)`
  border: none;
`;

const SignupVerifyIcon = styled(SignupVerifyIc)`
  height: 4rem;
  width: 4rem;
`;

const SignupErrorIcon = styled(SignupErrorIc)`
  height: 4rem;
  width: 4rem;
`;

const ErrorMessage = styled.strong`
  ${({ theme }) => theme.fonts.description}

  width: 100%;
  height: 2rem;

  color: ${({ theme }) => theme.colors.red};

  margin-top: 1.1rem;
`;
