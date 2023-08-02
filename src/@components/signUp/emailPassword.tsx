import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc, WeSentYouACodeIc } from "../../assets";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Email from "./email";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  console.log(errors.email?.message);

  return (
    <>
      {/* {checkIsResend() ? <WeSentYouACodeIcon /> : <SignupEmailPasswordTitleIcon />} */}
      <Email />
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin: 8rem 0 13.4rem 3.4rem;
`;

const WeSentYouACodeIcon = styled(WeSentYouACodeIc)`
  width: 30.7418rem;
  margin: 8rem 0 5.9rem 12rem;
`;
