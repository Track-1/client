export function checkNicknameForm(nickname:string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,16}$/
    return regex.test(nickname);
}
