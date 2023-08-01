import { useState } from "react";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { emailInputType } from "../../type/signUp/inputType";

export default function useEmailPasswordInput() {
  const [emailData, setEmailData] = useState<emailInputType>({
    email: "",
    message: EMAIL_MESSAGE.NULL,
  });

  return { emailData, setEmailData };
}
