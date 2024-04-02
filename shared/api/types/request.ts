import { CommentsParamsType } from './comments';

import { UserEmailType, UserLoginInfo, UserPasswordType, UserProfileType, VerifyCodeType } from './user';

export type DefaultResponseType<T = unknown> = {
  status: number | string;
  success: boolean;
  message: string;
  data: T;
};

export type UserProfileRequest = UserProfileType;

export type UserLoginInfoRequest = UserLoginInfo;

export type UserEmailRequest = UserEmailType;

export type UserPasswordRequest = UserPasswordType;

export type VerifyCodeRequest = VerifyCodeType;

export type CommentsRequest = CommentsParamsType & { trackId: number };
