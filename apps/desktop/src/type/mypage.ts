import { UserType } from "./common/userType";

interface MyProfileType {
  userId: number;
  userImageFile: string;
  userName: string;
  userContact: string;
  userIntroduction: string;
  userKeyword: string[];
  userTrackSearch: boolean;
}

interface MyPortfolioType {
  portfolioId: number;
  portfolioImageFile: string;
  portfolioAudioFile: string;
  portfolioTitle: string;
  portfolioContent: string;
  portfolioKeyword: string[];
  portfolioCategory: string;
  portfolioAudioFileLength: number;
}

export interface MyInfoType {
  userType: UserType;
  userProfile: MyProfileType;
  userPortfolio: MyPortfolioType[];
}

export interface MyPageTitleParamsType {
  bef: number;
  aft: number;
}
