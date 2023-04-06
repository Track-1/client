export function checkHashtagLength(tag:string) {
    const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return regex.test(tag);
}