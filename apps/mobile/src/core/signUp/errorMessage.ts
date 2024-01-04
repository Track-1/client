import { theme } from '../../style/theme';

export const EMAIL_MESSAGE = {
  NULL: 'email null',
  FORM: 'This email is invalid.',
  DUPLICATION: 'This email is already taken.',
  SUCCESS: 'email success',
  TIME: 'Valid time is 30 minutes.',
  VERIFY: 'email verify',
  ING: 'email ing',
  ACTIVE: 'email active',
  NOT_EXIST: 'We don’t have an account with that email address.',
};

export const VERIFICATION_CODE_MESSAGE = {
  NULL: 'verification code null',
  ERROR: 'You need to check the code.',
  SUCCESS: 'verification code success',
  ING: 'doing verification code check',
  ACTIVE: 'verification code active',
};

export const PASSWORD_MESSAGE = {
  NULL: 'password null',
  FORM: 'At least 10 characters(A-Z, a-z), numbers,\nor special characters.',
  MATCH: 'These passwords don’t match.',
  SUCCESS: 'password success',
};

export const NICKNAME_MESSAGE = {
  NULL: 'nickname null',
  ERROR: '1 to 16 characters(Korean, English), numbers\nor special characters.',
  SUCCESS: 'nickname success',
};

export const ERROR_COLOR = {
  GRAY: `${theme.colors.gray3}`,
  RED: `${theme.colors.red}`,
  VIOLET: `${theme.colors.neon_purple}`,
  WHITE: `${theme.colors.white}`,
  GREEN: `${theme.colors.neon_green}`,
  PINK: `${theme.colors.neon_pink}`,
  TRANSPARENT: 'transparent',
};

export const ERROR_STATUS = {
  ERROR: 'error',
  VERIFY: 'verify',
};
