import { getCookie } from './cookie';
import { UserType } from '../types/common/userType';

export function checkEnterCount(e: React.ChangeEvent<HTMLTextAreaElement>) {
  return e.target.value.split('\n').length;
}

export function checkIsSameId(currentId: number, targetId: number): boolean {
  return currentId === targetId;
}

export function checkIsNotSameId(currentId: number, targetId: number): boolean {
  return currentId !== targetId;
}

export function checkIsHoveredNothing(hoveredId: number) {
  return hoveredId === -1;
}

export function checkIsClickedNothing(clickedId: number) {
  return clickedId === -1;
}

export function checkIsLogin() {
  return getCookie('accessToken') !== undefined;
}

export function isLoggedIn() {
  return getCookie('accessToken');
}

export function checkIsCookieNull() {
  return getCookie('accessToken') === null;
}

export function checkIsCookieAuthenticated() {
  return getCookie('accessToken') === 'false';
}

export function checkKorean(text: string) {
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return regex.test(text); //true or false
}

export function checkMaxInputLength(textLength: number, maxLength: number) {
  return textLength <= maxLength;
}

export function checkIsVocal(userType: UserType): boolean {
  return userType === 'vocal';
}

export function checkIsProducer(userType: UserType): boolean {
  return userType === 'producer';
}
