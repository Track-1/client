import { EMAIL_FORM, NICKNAME_FORM, PASSWORD_FORM } from '../core/common/validation/regex';
import { NICKNAME_MESSAGE } from '../core/signUp/errorMessage';

export const EMAIL_RULE = {
  required: true,
  pattern: {
    value: EMAIL_FORM,
    message: 'Enter a valid email.',
  },
};

export const PASSWORD_RULE = {
  required: true,
  pattern: {
    value: PASSWORD_FORM,
    message: 'Enter a valid password',
  },
};

export const NICKNAME_RULE = {
  required: true,
  pattern: {
    value: NICKNAME_FORM,
    message: NICKNAME_MESSAGE.ERROR,
  },
};
