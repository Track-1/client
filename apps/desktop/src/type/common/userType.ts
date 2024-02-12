export type UserType = 'producer' | 'vocal';

export interface LoginUserDataType {
  userImageFile: string;
  userType: UserType;
  userName: string;
  userId: number;
  userContact: string;
}

export interface LoginSuccessDataType extends LoginUserDataType {
  accessToken: string;
}
