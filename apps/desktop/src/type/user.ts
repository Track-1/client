import { UserType } from "./common/userType";

export interface UserLoginInfo {
  userEmail: string;
  userPw: string;
  userType: UserType;
}

export interface UserProfileType {
  userContact: string;
  userCategory: string[];
  userKeyword: string[];
  userIntroduction: string;
}

export interface UserEmailType {
  userType: UserType;
  userEmail: string;
}

export interface UserPasswordType {
  userPw: string;
}

export interface VerifyCodeType {
  userType: UserType;
  userEmail: string;
  userCode: string;
}

export interface UserResultType {
  userId: number;
  userName: string;
  userType: string;
  userEmail: string;
}

export interface SingupResultType {
  userResult: UserResultType;
  accessToken: string;
}

type InActiveType = {
  isActive: false;
  text: "Request a password reset";
};
type ActiveRequestType = {
  isActive: true;
  text: "Request a password reset";
};

type ActiveResendType = {
  isActive: true;
  text: "Resend";
};

export type RequestPasswordButtonType = InActiveType | ActiveRequestType | ActiveResendType;
