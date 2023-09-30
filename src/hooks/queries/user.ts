import { UseFormResetField, UseFormSetError, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
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
  postUserEmail,
  postVerifyCode,
} from "../../api/user";
import { SIGNUP_SENDCODE } from "../../core/common/alert/signupSendCode";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { EMAIL_MESSAGE, VERIFICATION_CODE_MESSAGE } from "../../core/signUp/errorMessage";
import { loginUserId, loginUserType } from "../../recoil/common/loginUserData";
import {
  UserEmailRequest,
  UserLoginInfoRequest,
  UserPasswordRequest,
  UserProfileRequest,
  VerifyCodeRequest,
} from "../../type/api";
import { UserType } from "../../type/common/userType";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";
import { setCookie } from "../../utils/common/cookie";

export function useJoin() {
  const navigate = useNavigate();
  const setLoginUserType = useSetRecoilState(loginUserType);
  const setLoginUserId = useSetRecoilState(loginUserId);

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ userType, formData }: { userType: UserType; formData: JoinUserDataPropsType }) =>
      postJoin(userType, formData),
    onSuccess: (response: any) => {
      const accessToken = response.accessToken;
      setCookie("accessToken", accessToken, {});
      setLoginUserType(response.userResult.userType);
      setLoginUserId(response.userResult.userId);
      navigate("/signup/profile");
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
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userProfile: UserProfileRequest) => patchProfileAfterJoin(userProfile),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    profileAtferJoin: mutate,
    ...restValues,
  };
}

export function useLogin() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userInfo: UserLoginInfoRequest) => postLogin(userInfo),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    login: mutate,
    ...restValues,
  };
}

export function useLogout() {
  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.LOGOUT],
    queryFn: getLogout,
    onSuccess: () => {},
    onError: () => {},
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
    mutationFn: (userEmail: UserEmailRequest) => postUserEmail(userEmail),
    onSuccess: () => {
      setError("email", { message: EMAIL_MESSAGE.TIME });
      alert(SIGNUP_SENDCODE);
    },
    onError: (error: any) => {
      if (error?.response?.data.message === "중복된 이메일입니다") {
        setError("email", { message: EMAIL_MESSAGE.DUPLICATION });
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
  setValue: UseFormSetValue<EmailPasswordInputType>,
) {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (verifyCode: VerifyCodeRequest) => postVerifyCode(verifyCode),
    onSuccess: () => {
      setError("email", { message: EMAIL_MESSAGE.VERIFY });
      setError("verifyCode", { message: VERIFICATION_CODE_MESSAGE.SUCCESS });
      setValue("verifyCode", "");
      resetField("passwordConfirm");
    },
    onError: () => {
      setError("verifyCode", { message: VERIFICATION_CODE_MESSAGE.ERROR });
      setError("email", { message: EMAIL_MESSAGE.TIME });
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
      navigate("/");
    },
    onError: () => {},
  });
  return {
    patchPassword: mutate,
    ...restValues,
  };
}

export function useResetPassword() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => postResetPassword(userEmail),
    onSuccess: () => {},
    onError: () => {},
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
      alert("");
    },
  });
  return {
    tokenVerify: data,
    ...restValues,
  };
}
