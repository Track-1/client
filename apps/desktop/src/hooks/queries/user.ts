import { AxiosError } from 'axios';
import { UseFormResetField, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  getAccessToken,
  getLogout,
  getTokenVerify,
  patchPassword,
  patchProfileAfterJoin,
  patchResetPassword,
  patchVerifyEmail,
  postJoin,
  postLogin,
  postResetPassword,
  postVerifyCode,
  postVerifyEmail,
} from '../../api/user';
import { ALERT } from '../../core/common/alert/signupSendCode';
import { QUERIES_KEY } from '../../core/common/queriesKey';
import { EMAIL_MESSAGE, VERIFICATION_CODE_MESSAGE } from '../../core/signUp/errorMessage';
import { loginUserData } from '../../recoil/common/loginUserData';
import {
  DefaultResponseType,
  UserEmailRequest,
  UserLoginInfoRequest,
  UserPasswordRequest,
  UserProfileRequest,
  VerifyCodeRequest,
} from '../../type/api';
import { LoginSuccessDataType, UserType } from '../../type/common/userType';
import { EmailPasswordInputType } from '../../type/signUp/inputType';
import { JoinUserDataPropsType } from '../../type/signUp/joinUserDataType';
import { removeCookie, setCookie } from '../../utils/common/cookie';

export function useJoin() {
  const navigate = useNavigate();
  const setLoginUserData = useSetRecoilState(loginUserData);

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ userType, formData }: { userType: UserType; formData: JoinUserDataPropsType }) =>
      postJoin(userType, formData),
    onSuccess: (response: any) => {
      const accessToken = response.accessToken;
      setCookie('accessToken', accessToken, {});
      setLoginUserData({
        userType: response.userResult.userType,
        userId: response.userResult.userId,
        userImageFile: response.userResult.userImage,
        userName: response.userResult.userName,
        userContact: response.userResult.userContact,
      });

      navigate('/signup/profile');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    join: mutate,
    ...restValues,
  };
}

export function useProfileAfterJoin() {
  const navigate = useNavigate();
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userProfile: UserProfileRequest) => patchProfileAfterJoin(userProfile),
    onSuccess: () => {
      navigate('/signup/success');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    profileAtferJoin: mutate,
    ...restValues,
  };
}

export function useLogin() {
  const setLoginUserData = useSetRecoilState(loginUserData);

  const navigate = useNavigate();
  const { mutate, ...restValues } = useMutation<
    DefaultResponseType<LoginSuccessDataType>,
    AxiosError<DefaultResponseType<LoginSuccessDataType>>,
    UserLoginInfoRequest
  >((userInfo: UserLoginInfoRequest) => postLogin(userInfo), {
    onSuccess: (response: DefaultResponseType<LoginSuccessDataType>) => {
      setLoginUserData({
        userType: response.data.userType,
        userId: response.data.userId,
        userImageFile: response.data.userImageFile,
        userName: response.data.userName,
        userContact: response.data.userContact,
      });

      setCookie('accessToken', response?.data?.accessToken, {});
      navigate('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    login: mutate,
    ...restValues,
  };
}

export function useLogout(state: boolean) {
  const resetLoginUserData = useResetRecoilState(loginUserData);

  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.LOGOUT],
    queryFn: getLogout,
    onSuccess: () => {
      resetLoginUserData();

      removeCookie('accessToken', { path: '/' });
    },
    onError: () => {},
    enabled: state,
  });
  return {
    logout: data,
    ...restValues,
  };
}

export function useAccessToken() {
  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.ACCESS_TOKEN],
    queryFn: getAccessToken,
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    accessToken: data,
    ...restValues,
  };
}

export function useUserEmail(setError: UseFormSetError<EmailPasswordInputType>) {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => postVerifyEmail(userEmail),
    onSuccess: () => {
      setError('email', { message: EMAIL_MESSAGE.TIME });
      alert(ALERT.SIGNUP_SENDCODE);
    },
    onError: (error: any) => {
      if (error?.response?.data.message === '중복된 이메일입니다') {
        setError('email', { message: EMAIL_MESSAGE.DUPLICATION });
      }
    },
  });
  return {
    sendEmail: mutate,
    ...restValues,
  };
}

export function useVerifyEmail() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => patchVerifyEmail(userEmail),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    verifyEmail: mutate,
    ...restValues,
  };
}

export function useVerifyCode(
  setError: UseFormSetError<EmailPasswordInputType>,
  resetField: UseFormResetField<EmailPasswordInputType>,
  setValue: UseFormSetValue<EmailPasswordInputType>
) {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (verifyCode: VerifyCodeRequest) => postVerifyCode(verifyCode),
    onSuccess: () => {
      setError('email', { message: EMAIL_MESSAGE.VERIFY });
      setError('verifyCode', { message: VERIFICATION_CODE_MESSAGE.SUCCESS });
      setValue('verifyCode', '');
      resetField('passwordConfirm');
    },
    onError: () => {
      setError('verifyCode', { message: VERIFICATION_CODE_MESSAGE.ERROR });
      setError('email', { message: EMAIL_MESSAGE.TIME });
    },
  });
  return {
    verifyCode: mutate,
    ...restValues,
  };
}

export function usePatchPassword() {
  const navigate = useNavigate();
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userPassword: UserPasswordRequest) => patchPassword(userPassword),
    onSuccess: () => {
      alert(ALERT.RESET_PASSWORD_SUCCESS);
      navigate('/');
    },
    onError: () => {},
  });
  return {
    patchPassword: mutate,
    ...restValues,
  };
}

export function useResetPassword(setError: UseFormSetError<EmailPasswordInputType>) {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => postResetPassword(userEmail),
    onSuccess: () => {
      setError('email', { message: EMAIL_MESSAGE.TIME });
      alert(ALERT.FORGOT_PASSWORD_SEND_LINK);
    },
    onError: () => {
      setError('email', { message: EMAIL_MESSAGE.NOT_EXIST });
    },
  });
  return {
    resetPassword: mutate,
    ...restValues,
  };
}

export function useRetryResetPassword() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => patchResetPassword(userEmail),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    retryResetPassword: mutate,
    ...restValues,
  };
}

export function useTokenVerify() {
  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.TOKEN_VERIFY],
    queryFn: getTokenVerify,
    onSuccess: () => {},
    onError: () => {
      alert('');
    },
  });
  return {
    tokenVerify: data,
    ...restValues,
  };
}
