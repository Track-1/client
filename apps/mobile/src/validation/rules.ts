import { EMAIL_FORM, PASSWORD_FORM } from '../core/common/validation/regex';

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
