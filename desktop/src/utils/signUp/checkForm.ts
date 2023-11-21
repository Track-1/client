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
