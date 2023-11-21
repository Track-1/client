export function checkKorean(text: string) {
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return regex.test(text); //true or false
}
