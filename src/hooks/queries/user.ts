import { useMutation, useQuery } from "react-query";
import {
  getAccessToken,
  getLogout,
  getTokenVerify,
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
import { UserEmailRequest, UserLoginInfoRequest, UserProfileRequest, VerifyCodeRequest } from "../../type/api";
import { UserType } from "../../type/common/userType";

export function useJoin() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ userType, formData }: { userType: UserType; formData: FormData }) => postJoin(userType, formData),
    onSuccess: () => {},
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

export function useUSerEmail() {
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

export function useVerifyCote() {
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
    onError: () => {},
  });
  return {
    tokenVerify: data,
    ...restValues,
  };
}
