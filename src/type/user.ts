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
