export interface message {
  message: string;
}

export interface emailInputType extends message {
  email: string;
}

export interface passwordInputType extends message {
  password: string;
  passwordConfirm: string;
}
