import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Email from "./email";
import VerifyCode from "./verifyCode";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  return (
    <EmailPasswordWrapper>
      <Email />
      <VerifyCode />
    </EmailPasswordWrapper>
  );
}

const EmailPasswordWrapper = styled.div`
  color: white;
`;
