import { LIMIT_IMAGE_SIZE } from '../../core/common/fileSize';
import { AUDIO_FILE_TYPE, IMAGE_FILE_TYPE } from '../../core/common/fileType';
import { getCookie } from './cookie';
import { ROLE } from '../../core/common/roleType';
import { UserType } from '../../type/common/userType';

export function checkFileSize(imageSize: number) {
  if (imageSize > LIMIT_IMAGE_SIZE) {
    alert('Only files under 5 MB can be uploaded.\n5MB 이하의 파일만 업로드 가능합니다.');
    return false;
  }
  return true;
}

export function checkEnterCount(e: React.ChangeEvent<HTMLTextAreaElement>) {
  return e.target.value.split('\n').length;
}

export function checkAudioFileType(audioFileType: string) {
  return Object.values(AUDIO_FILE_TYPE).includes(audioFileType);
}

export function checkImageFileType(imageFileType: string) {
  return Object.values(IMAGE_FILE_TYPE).includes(imageFileType);
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

export function isVocal(userType: string): boolean {
  return userType === ROLE.VOCAL;
}

export function isProducer(userType: UserType): boolean {
  return userType === ROLE.PRODUCER;
}
