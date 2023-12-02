import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, UseFormGetValues } from "react-hook-form";
import { CategoryType, UpperCategoryType } from "./common/category";
import { UserType } from "./common/userType";

export interface ParamsType {
  page: number;
  limit: number;
}

export interface ProducerInfoParamsType extends ParamsType {
  userId: number;
}

export interface ProfileEditType {
  userImageFile: File | Blob | null;
  userName: string;
  userContact: string;
  userCategory: string[];
  userKeyword: string[];
  userIntroduction: string;
  userImageFileSame: boolean;
}

export interface VocalProfileEditType extends ProfileEditType {
  userTrackSearch: boolean;
}

export interface UserProfileType {
  userId: number;
  userImageFile: string;
  userName: string;
  userContact: string;
  userCategory: UpperCategoryType[];
  userIntroduction: string;
  userKeyword: string[];
  userTrackSearch: boolean;
}

export interface UserPortfolioType {
  portfolioId: number;
  portfolioImageFile: string;
  portfolioAudioFile: string;
  portfolioAudioFileName: string;
  portfolioTitle: string;
  portfolioContent: string;
  portfolioKeyword: string[];
  portfolioCategory: CategoryType;
  portfolioAudioFileLength: number;
}

export interface ProducerVocalSearchingType {
  trackId: number;
  trackImageFile: string;
  trackAudioFile: string;
  trackAudioFileName: string;
  trackTitle: string;
  trackContent: string;
  trackKeyword: string[];
  trackCategory: string;
  trackAudioFileLength: number;
  trackClosed: boolean;
}

export interface ProducerInfoType {
  userType: UserType;
  userSelf: boolean;
  userProfile: UserProfileType;
}

export interface VocalInfoParamsType extends ParamsType {
  userId: number;
}

export interface VocalProfileType {
  userType: UserType;
  userSelf: boolean;
  userProfile: UserProfileType;
  userPortfolio: UserPortfolioType[];
}

export interface VocalInfoType {
  hasNextPage: boolean;
  data: UserPortfolioType[];
}

export interface ProducerPortfolioType {
  hasNextPage: boolean;
  data: UserPortfolioType[];
}

export interface ProducerVocalSearchingInfoType {
  hasNextPage: boolean;
  data: ProducerVocalSearchingType[];
}

export type ProfileInfoInputType = {
  nickName: string;
  contact: string;
  category: string[];
  hashtag: string[];
  description: string;
};

export type FormContextType = {
  hashtagRef: React.MutableRefObject<HTMLInputElement | undefined>;
  getValues: UseFormGetValues<FieldValues>;
};

export type FieldArrayType = {
  append: UseFieldArrayAppend<FieldValues, "hashtag">;
  remove: UseFieldArrayRemove;
  fields: Record<"id", string>[];
};
