export function checkPasswordForm(password:string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return regex.test(password);
}

