import { UserType } from '../types/common/userType';

export function checkEnterCount(e: React.ChangeEvent<HTMLTextAreaElement>) {
  return e.target.value.split('\n').length;
}

export function checkIsSameId(currentId: number, targetId: number): boolean {
  return currentId === targetId;
}

export function checkKorean(text: string) {
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return regex.test(text); //true or false
}

export function checkMaxInputLength(textLength: number, maxLength: number) {
  return textLength <= maxLength;
}

export function checkIsProducer(userType: UserType) {
  return userType === 'producer';
}

export function checkIsVocal(userType: UserType) {
  return userType === 'vocal';
}
