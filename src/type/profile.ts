import { UserType } from "./common/userType";

export interface ParamsType {
  page: number;
  limit: number;
}

export interface ProducerInfoParamsType extends ParamsType {
  userId: number;
}

export interface UserProfileType {
  userId: number;
  userImageFile: string;
  userName: string;
  userContact: string;
  userCategory: string[];
  userIntroduction: string;
  userKeyword: string[];
  userTrackSearch: boolean;
}

export interface UserPortfolioType {
  portfolioId: number;
  portfolioImageFile: string;
  portfolioAudioFile: string;
  portfolioTitle: string;
  portfolioContent: string;
  portfolioKeyword: string[];
  portfolioCategory: string;
  portfolioAudioFileLength: number;
}

interface ProducerVocalSearchingType {
  trackId: number;
  trackImageFile: string;
  trackAudioFile: string;
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
  userPortfolio: UserPortfolioType[];
  trackList: ProducerVocalSearchingType[];
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
