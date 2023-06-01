import { SIGNUP_STEP } from "../../core/signUp/stepRenderer";
import EmailPassword from "./emailPassword";
import NicknameConvention from "./nicknameConvention";
import Role from "./role";
import { StepHeaderProp } from "./stepHeader";

interface StepMainProps extends StepHeaderProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function StepMain(props: StepMainProps) {
  const { step, setStep } = props;

  switch (step) {
    case SIGNUP_STEP.ROLE:
      return <Role setStep={setStep} />;
    case SIGNUP_STEP.EMAIL_PASSWORD:
      return <EmailPassword setStep={setStep} />;
    case SIGNUP_STEP.NICKNAME_CONVENTION:
      return <NicknameConvention setStep={setStep} />;
    default:
      return <></>;
  }
}
