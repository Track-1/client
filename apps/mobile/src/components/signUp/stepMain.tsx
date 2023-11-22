import { SIGNUP_STEP } from "../../core/signUp/stepRenderer";
import { StepProp } from "../../type/signUp/stepProps";
import EmailPassword from "./emailPassword";
import NicknameConvention from "./nicknameConvention";
import Role from "./role";

export default function StepMain(props: StepProp) {
  const { step } = props;

  switch (step) {
    case SIGNUP_STEP.ROLE:
      return <Role />;
    case SIGNUP_STEP.EMAIL_PASSWORD:
      return <EmailPassword />;
    case SIGNUP_STEP.NICKNAME_CONVENTION:
      return <NicknameConvention />;
    default:
      return <></>;
  }
}
