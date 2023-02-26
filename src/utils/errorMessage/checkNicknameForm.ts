export function checkNicknameForm(nickname:string) {
    const regex = /^[a-zA-z0-9!@#$%^*+=-]{1,16}$/
    return regex.test(nickname);
}
