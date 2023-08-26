import { CommentsListType, CommentsParamsType } from "./comments";
import { UserLoginInfo } from "./login";
import { MyInfoType } from "./mypage";
import { ProducerInfoType, VocalInfoType } from "./profile";
import { UserEmailType, UserPasswordType, UserProfileType, VerifyCodeType } from "./user";
import { FilteredTrackListType, TrackDetailType, TrackDownloadType } from "./tracks";
import { FilteredVocalListType } from "./vocals";

export type DefaultResponseType<T = unknown> = {
  status: number;
  success: boolean;
  messaage: string;
  data?: T;
};

export type UserProfileRequest = UserProfileType;

export type UserLoginInfoRequest = UserLoginInfo;

export type UserEmailRequest = UserEmailType;

export type UserPasswordRequest = UserPasswordType;

export type VerifyCodeRequest = VerifyCodeType;

export type FilteredTrackResponse = DefaultResponseType<FilteredTrackListType>;

export type TrackDetailResponse = DefaultResponseType<TrackDetailType[]>;

export type TrackDownloadResponse = DefaultResponseType<TrackDownloadType>;

export type CommentsRequest = CommentsParamsType & { trackId: number };

export type CommentsResponse = DefaultResponseType<CommentsListType>;

export type FilteredVocalsResponse = DefaultResponseType<FilteredVocalListType>;

export type ProducerInfoResponse = DefaultResponseType<ProducerInfoType>;

export type VocalInfoResponse = DefaultResponseType<VocalInfoType>;

export type MyInfoResponse = DefaultResponseType<MyInfoType>;
