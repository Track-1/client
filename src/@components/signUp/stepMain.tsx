import { SIGNUP_STEP } from "../../core/signUp/stepRenderer";
import { StepProp } from "../../type/signUp/stepProps";
import EmailPassword from "./emailPassword";
import NicknameConvention from "./nicknameConvention";
import Role from "./role";

export interface StepMainProps extends StepProp {
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
