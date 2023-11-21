import { ProducerUploadType } from "../../type/common/upload";

export const ROUTES = {
  MAIN: "/",
  SIGNUP: "/signup",
  SIGNUP_PROFILE: "/signup/profile",
  SIGNUP_SUCCESS: "/signup/success",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: (token: number) => `/reset-password/${token}`,
  TRACK_SEARCH: "/track-search",
  VOCAL_SEARCH: "/vocal-search",
  TRACK_POST: (id: number) => `/track-post/${id}`,
  LOGIN: "/login",
  ERROR: "*",
  UPLOAD_VOCAL_PORTFOLIO: "/upload/vocal/portfolio",
  UPLOAD_PRODUCER: (uploadType: ProducerUploadType) => `/upload/producer/${uploadType}`,
  PORTFOLIO_EDIT_PRODUCER: (trackId: number) => `/portfolio-edit/producer/${trackId}`,
  VOCAL_SEARCHING_EDIT_PRODUCER: (trackId: number) => `/vocal-searching-edit/producer/${trackId}`,
  PORTFOLIO_EDIT_VOCAL: (trackId: number) => `/portfolio-edit/vocal/${trackId}`,
  PROFILE_EDIT: "/profile-edit",
  VOCAL_PROFILE: (vocalId: number) => `/vocal-profile/${vocalId}`,
  PRODUCER_PROFILE: (producerId: number) => `/producer-profile/${producerId}`,
} as const;
