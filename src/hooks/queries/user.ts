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
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { loginUserId, loginUserType } from "../../recoil/common/loginUserData";
import {
  UserEmailRequest,
  UserLoginInfoRequest,
  UserPasswordRequest,
  UserProfileRequest,
  VerifyCodeRequest,
} from "../../type/api";
import { UserType } from "../../type/common/userType";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";

export function useJoin() {
  const navigate = useNavigate();
  const setLoginUserType = useSetRecoilState(loginUserType);
  const setLoginUserId = useSetRecoilState(loginUserId);

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ userType, formData }: { userType: UserType; formData: JoinUserDataPropsType }) =>
      postJoin(userType, formData),
    onSuccess: (response) => {
      console.log(response);
      // const accessToken = response.accessToken;
      // setCookie("accessToken", accessToken, {});
      // setLoginUserType(response.data.userResult.tableName);
      // setLoginUserId(response.data.data.userResult.id);
      navigate("/signup/profile");
    },
    onError: () => {},
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

export function useUserEmail() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (userEmail: UserEmailRequest) => postUserEmail(userEmail),
    onSuccess: () => {},
    onError: () => {},
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
    onSuccess: () => {},
    onError: () => {},
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
