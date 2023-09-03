import {
  DefaultResponseType,
  UserEmailRequest,
  UserLoginInfoRequest,
  UserPasswordRequest,
  UserProfileRequest,
  VerifyCodeRequest,
} from "../type/api";
import { UserType } from "../type/common/userType";
import { getCookie } from "../utils/common/cookie";
import { client } from "./common/client";
import { USER } from "./path";

export async function postJoin(userType: UserType, formData: FormData) {
  const { data } = await client.post<DefaultResponseType>(USER.JOIN(userType), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchProfileAfterJoin(userProfile: UserProfileRequest) {
  const { data } = await client.patch<DefaultResponseType>(USER.JOIN_PROFILE, userProfile);
  return data;
}

export async function postLogin(userInfo: UserLoginInfoRequest) {
  const { data } = await client.post<DefaultResponseType>(USER.AUTH_LOGIN, userInfo);
  return data;
}

export async function getLogout() {
  const { data } = await client.get<DefaultResponseType>(USER.AUTH_LOGOUT);
  return data;
}

export async function getAccessToken() {
  const { data } = await client.get<DefaultResponseType>(USER.AUTH_REFRESH);
  return data;
}

export async function postUserEmail(userEmail: UserEmailRequest) {
  const { data } = await client.post<DefaultResponseType>(USER.BASIC_EMAIL, userEmail);
  return data;
}

export async function patchPassword(userPassword: UserPasswordRequest) {
  const accessToken = getCookie("accessToken");
  const { data } = await client.patch<DefaultResponseType>(USER.BASIC_PASSWORD(accessToken), userPassword);
  return data;
}

export async function postVerifyEmail(userEmail: UserEmailRequest) {
  const { data } = await client.post<DefaultResponseType>(USER.MAIL_SEND, userEmail);
  return data;
}

export async function patchVerifyEmail(userEmail: UserEmailRequest) {
  const { data } = await client.patch<DefaultResponseType>(USER.MAIL_SEND_RE, userEmail);
  return data;
}

export async function postVerifyCode(verifyCode: VerifyCodeRequest) {
  const { data } = await client.post<DefaultResponseType>(USER.MAIL_VERIFY, verifyCode);
  return data;
}

export async function postResetPassword(userEmail: UserEmailRequest) {
  const { data } = await client.post<DefaultResponseType>(USER.MAIL_RESET_PASSWORD, userEmail);
  return data;
}

export async function patchResetPassword(userEmail: UserEmailRequest) {
  const { data } = await client.patch<DefaultResponseType>(USER.MAIL_RESET_PASSWORD_RE, userEmail);
  return data;
}

export async function getTokenVerify() {
  const accessToken = getCookie("accessToken");
  const { data } = await client.get(USER.MAIL_PASSWORD_TOKEN(accessToken));
  return data;
}
