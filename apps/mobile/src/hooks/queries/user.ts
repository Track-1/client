import { AxiosError } from 'axios';
import { FieldValues, UseFormResetField, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { EMAIL_MESSAGE } from '../../core/signUp/errorMessage';
import { loginUserData } from '../../recoil/common/loginUserData';
import {
  DefaultResponseType,
  LoginResponse,
  UserEmailRequest,
  UserLoginInfoRequest,
  UserPasswordRequest,
  UserProfileRequest,
  VerifyCodeRequest,
} from '../../type/api';
import { UserType } from '../../type/common/userType';
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
        userId: response.userResult.userId,
        userType: response.userResult.userType,
        userName: response.userResult.userName,
        userImageFile: response.userResult.userImageFile,
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
  const prevPage = useLocation().state.prevPage;

  const { mutate, ...restValues } = useMutation<LoginResponse, AxiosError<DefaultResponseType>, UserLoginInfoRequest>(
    (userInfo: UserLoginInfoRequest) => postLogin(userInfo),
    {
      onSuccess: (data: LoginResponse) => {
        setCookie('accessToken', data?.data?.accessToken, {});
        setLoginUserData({
          userId: data?.data.userId,
          userType: data?.data.userType,
          userName: data?.data.userName,
          userImageFile: data?.data.userImageFile,
        });
        prevPage ? navigate(prevPage) : navigate(-1);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return {
    login: mutate,
    ...restValues,
  };
}

export function useLogout() {
  const { data, ...restValues } = useQuery({
    queryFn: getLogout,
    onError: () => {},
    enabled: false,
  });
  return {
    isLoggedOut: data,
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

export function useUserEmail() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => postVerifyEmail(userEmail),
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

export function useVerifyCode() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (verifyCode: VerifyCodeRequest) => postVerifyCode(verifyCode),
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
