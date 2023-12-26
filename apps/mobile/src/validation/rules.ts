import { EMAIL_FORM, PASSWORD_FORM } from '../core/common/validation/regex';

export const EMAIL_RULE = {
  required: '필수입력 항목입니다.',
  pattern: {
    value: EMAIL_FORM,
    message: 'Enter a valid email.',
  },
};

export const PASSWORD_RULE = {
  pattern: {
    value: PASSWORD_FORM,
    message: 'Enter a valid email.',
  },
  minLength: 8,
  maxLength: 25,
};
