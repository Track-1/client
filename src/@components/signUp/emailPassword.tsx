import { useRecoilState } from "recoil";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Email from "./email";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  return (
    <>
      <Email />
    </>
  );
}
