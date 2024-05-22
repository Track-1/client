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
  JOIN: `${PATH.user}/join/`,
  JOIN_PROFILE: `${PATH.user}/join/complete-profile`,
  AUTH_LOGIN: `${PATH.user}/auth/login`,
  AUTH_LOGOUT: `${PATH.user}/auth/logout`,
  AUTH_REFRESH: `${PATH.user}/auth/refresh`,
  BASIC_EMAIL: `${PATH.user}/basic/check-email`,
  BASIC_PASSWORD: `${PATH.user}/basic/reset-password/`,
  MAIL_SEND: `${PATH.user}/mail/join`,
  MAIL_SEND_RE: `${PATH.user}/mail/join/repost`,
  MAIL_VERIFY: `${PATH.user}/mail/join/verify-code`,
  MAIL_RESET_PASSWORD: `${PATH.user}/mail/reset-password`,
  MAIL_RESET_PASSWORD_RE: `${PATH.user}/mail/reset-password/repost`,
  MAIL_PASSWORD_TOKEN: `${PATH.user}/mail/reset-password/`,
} as const;

export const TRACKS = {
  FILTERED_LIST: `${PATH.tracks}?`,
  DETAIL: `${PATH.tracks}/detail`,
  DOWNLOAD: (trackId: number) => `${PATH.tracks}/${trackId}/download`,
  POST: `${PATH.tracks}`,
  TRACK_CLOSE: `${PATH.tracks}/closed`,
  RECENT_TRACKS: (count: number) => `${PATH.tracks}/${PATH.recent}/${count}`,
} as const;

export const COMMENTS = {
  LIST: `${PATH.comments}`,
  POST: `${PATH.comments}`,
  PATCH: `${PATH.comments}`,
  DELETE: `${PATH.comments}`,
} as const;

export const VOCALS = {
  FILTERED_LIST: `${PATH.vocals}?`,
  RECENT_VOCALS: (count: number) => `${PATH.vocals}${PATH.recent}/${count}`,
} as const;

export const PROFILE = {
  PRODUCER_PROFILE: `${PATH.profile}/producer/?`,
  PRODUCER_INFO: `${PATH.profile}/producer/works?`,
  VOCAL_PROFILE: `${PATH.profile}/vocal/?`,
  VOCAL_INFO: `${PATH.profile}/vocal/works?`,
  PATCH_PRODUCER: `${PATH.profile}/producer`,
  PATCH_VOCAL: `${PATH.profile}/vocal`,
} as const;

export const MYPAGE = {
  INFO: `${PATH.mypage}?`,
  UPLOAD_PRODUCER_PORTFOLIO: `${PATH.mypage}/producer`,
  UPLOAD_VOCAL_PORTFOLIO: `${PATH.mypage}/vocal`,
  PATCH_PRODUCER_PORTFOLIO: `${PATH.mypage}/producer/`,
  PATCH_VOCAL_PORTFOLIO: `${PATH.mypage}/vocal/`,
  PATCH_PRODUDCER_TITLE: `${PATH.mypage}/producer?`,
  PATCH_VOCAL_TITLE: `${PATH.mypage}/vocal?`,
  DELETE_PRODUCER_PORTFOLIO: `${PATH.mypage}/producer/`,
  DELETE_VOCAL_PORTFOLIO: `${PATH.mypage}/vocal/`,
} as const;

export const ADMIN = {
  EVENT: `${PATH.event}`,
  EVENT_DETAIL: (eventId: number) => `${PATH.event}/${eventId}`,
};
