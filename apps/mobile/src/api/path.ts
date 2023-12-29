import { UserType } from '../type/common/userType';

export const PATH = {
  user: '/user',
  tracks: '/tracks',
  vocals: '/vocals',
  comments: '/comments',
  profile: '/profile',
  mypage: '/mypage',
  recent: '/recent',
  event: '/event',
};

export const USER = {
  JOIN: (userType: UserType) => `${PATH.user}/join/${userType}`,
  JOIN_PROFILE: `${PATH.user}/join/complete-profile`,
  AUTH_LOGIN: `${PATH.user}/auth/login`,
  AUTH_LOGOUT: `${PATH.user}/auth/logout`,
  AUTH_REFRESH: `${PATH.user}/auth/refresh`,
  BASIC_EMAIL: `${PATH.user}/basic/check-email`,
  BASIC_PASSWORD: (token: string) => `${PATH.user}/basic/reset-password/${token}`,
  MAIL_SEND: `${PATH.user}/mail/join`,
  MAIL_SEND_RE: `${PATH.user}/mail/join/repost`,
  MAIL_VERIFY: `${PATH.user}/mail/join/verify-code`,
  MAIL_RESET_PASSWORD: `${PATH.user}/mail/reset-password`,
  MAIL_RESET_PASSWORD_RE: `${PATH.user}/mail/reset-password/repost`,
  MAIL_PASSWORD_TOKEN: (token: string) => `${PATH.user}/mail/reset-password/${token}`,
} as const;

export const TRACKS = {
  FILTERED_LIST: `${PATH.tracks}?`,
  DETAIL: (trackId: number) => `${PATH.tracks}/${trackId}`,
  DOWNLOAD: (trackId: number) => `${PATH.tracks}/${trackId}/download`,
  POST: `${PATH.tracks}`,
  TRACK_CLOSE: (trackId: number) => `${PATH.tracks}/${trackId}/closed`,
  RECENT_TRACKS: (count: number) => `${PATH.tracks}${PATH.recent}/${count}`,
} as const;

export const COMMENTS = {
  LIST: (trackId: number) => `${PATH.comments}/${trackId}?`,
  POST: (trackId: number) => `${PATH.comments}/${trackId}`,
  PATCH: (commentId: number) => `${PATH.comments}/${commentId}`,
  DELETE: (commentId: number) => `${PATH.comments}/${commentId}`,
} as const;

export const VOCALS = {
  FILTERED_LIST: `${PATH.vocals}?`,
  RECENT_VOCALS: (count: number) => `${PATH.vocals}${PATH.recent}/${count}`,
} as const;

export const PROFILE = {
  PRODUCER_PROFILE: (userId: number) => `${PATH.profile}/producer/${userId}?`,
  PRODUCER_INFO: (userId: number) => `${PATH.profile}/producer/${userId}/works?`,
  //   PRODUCER_VOCAL_SEARCH: (userId: number) => `${PATH.profile}/producer/${userId}/tracks?`,
  VOCAL_PROFILE: (userId: number) => `${PATH.profile}/vocal/${userId}?`,
  VOCAL_INFO: (userId: number) => `${PATH.profile}/vocal/${userId}/works?`,
  PATCH_PRODUCER: `${PATH.profile}/producer`,
  PATCH_VOCAL: `${PATH.profile}/vocal`,
} as const;

export const MYPAGE = {
  INFO: `${PATH.mypage}?`,
  UPLOAD_PRODUCER_PORTFOLIO: `${PATH.mypage}/producer`,
  UPLOAD_VOCAL_PORTFOLIO: `${PATH.mypage}/vocal`,
  PATCH_PRODUCER_PORTFOLIO: (portfolioId: number) => `${PATH.mypage}/producer/${portfolioId}`,
  PATCH_VOCAL_PORTFOLIO: (portfolioId: number) => `${PATH.mypage}/vocal/${portfolioId}`,
  PATCH_PRODUDCER_TITLE: `${PATH.mypage}/producer?`,
  PATCH_VOCAL_TITLE: `${PATH.mypage}/vocal?`,
  DELETE_PRODUCER_PORTFOLIO: (portfolioId: number) => `${PATH.mypage}/producer/${portfolioId}`,
  DELETE_VOCAL_PORTFOLIO: (portfolioId: number) => `${PATH.mypage}/vocal/${portfolioId}`,
} as const;

export const ADMIN = {
  EVENT: `${PATH.event}`,
  EVENT_DETAIL: (eventId: number) => `${PATH.event}/${eventId}`,
};
