export const STATIC_ROUTES = {
  Main: '/',
  SIGN_UP: '/signup',
  FORGIT_PASSWORD: '/forgot-password',
  TRACK_SEARCH: '/track-search',
  VOCAL_SEARCH: '/vocal-search',
  LOGIN: '/login',
  ERROR: '*',

  SIGN_UP_PROFILE: '/signup/profile',
  SIGN_UP_SUCCESS: '/signup/success',
  UPLOAD_VOCAL_PORTFOLIO: '/upload/vocal/portfolio',
};

export const DYNAMIC_ROUTES = {
  RESET_PASSWORD: '/reset-password/:token',
  TRACK_POST: '/track-post/:id',
  UPLOAD_PRODUCER: '/upload/producer/:uploadType',
  PORTFOLIO_EDIT_PRODUCER: '/portfolio-edit/producer/:trackId',
  VOCALSEARCHING_EDIT: '/vocal-searching-edit/producer/:trackId',
  PORTFOLIO_EDIT: '/portfolio-edit/vocal/:trackId',
  PROFILE_EDIT: '/portfolio-edit/vocal/:trackId',
  VOCAL_PROFILE: '/vocal-profile/:vocalId',
  PRODUCER_PROFILE: '/producer-profile/:producerId',
};
