import { CommentsListType, CommentsParamsType } from "./comments";
import { MyInfoType } from "./mypage";
import {
  ProducerInfoType,
  ProducerPortfolioType,
  ProducerVocalSearchingInfoType,
  VocalInfoType,
  VocalProfileType,
} from "./profile";
import { FilteredTrackListType, TrackDetailType, TrackDownloadType } from "./tracks";
import { UserEmailType, UserLoginInfo, UserPasswordType, UserProfileType, VerifyCodeType } from "./user";
import { FilteredVocalListType } from "./vocals";

export type DefaultResponseType<T = unknown> = {
  status: number;
  success: boolean;
  message: string;
  data: T;
};

export type UserProfileRequest = UserProfileType;

export type UserLoginInfoRequest = UserLoginInfo;

export type UserEmailRequest = UserEmailType;

export type UserPasswordRequest = UserPasswordType;

export type VerifyCodeRequest = VerifyCodeType;

export type FilteredTrackResponse = DefaultResponseType<FilteredTrackListType[]>;

export type TrackDetailResponse = DefaultResponseType<TrackDetailType>;

export type TrackDownloadResponse = DefaultResponseType<TrackDownloadType>;

export type CommentsRequest = CommentsParamsType & { trackId: number };

export type CommentsResponse = DefaultResponseType<CommentsListType>;

export type FilteredVocalsResponse = DefaultResponseType<FilteredVocalListType[]>;

export type ProducerInfoResponse = DefaultResponseType<ProducerInfoType>;

export type VocalProfileResponse = DefaultResponseType<VocalProfileType>;

export type MyInfoResponse = DefaultResponseType<MyInfoType>;

export type VocalInfoResponse = DefaultResponseType<VocalInfoType>;

export type ProducerVocalSearchingResponse = DefaultResponseType<ProducerVocalSearchingInfoType>;

export type ProducerPortfolioResponse = DefaultResponseType<ProducerPortfolioType>;
