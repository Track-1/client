import { EMAIL_MESSAGE } from '../../core/signUp/errorMessage';
import { ConventionChecksType } from '../../type/signUp/conventionChecksType';

export function checkEmailVerified(value: string | undefined) {
  return value === EMAIL_MESSAGE.VERIFY;
}

export function checkEmailVerifyOKToSuccess(value: string | undefined) {
  return value === EMAIL_MESSAGE.VERIFY;
}

export function checkEssentialAgree(checkedConventions: ConventionChecksType[]) {
  return checkedConventions[1].selected === true && checkedConventions[2].selected === true;
}
export function checkEmailForm(email: string) {
  const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
}

export function checkPasswordForm(password: string) {
  const regex = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return regex.test(password);
}

export function checkNicknamForm(nickname: string) {
  const regex = /^[a-zA-z0-9~!@#$%^&*()_+|<>?:{}가-힣]{1,16}$/;
  return regex.test(nickname);
}
export function checkInputEmpty(value: string) {
  return value === '';
}

export function checkIsResend(message: string | undefined) {
  return message === EMAIL_MESSAGE.TIME;
}
export function checkPasswordMatch(password: string, passwordConfirm: string) {
  return password === passwordConfirm;
}
export function showPassword(isShow: boolean) {
  return isShow ? 'text' : 'password';
}
