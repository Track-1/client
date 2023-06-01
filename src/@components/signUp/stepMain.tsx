import { StepHeaderProp } from "./stepHeader";

interface StepMainProps extends StepHeaderProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function StepMain(props: StepMainProps) {
  const { step, setStep } = props;

  return <div>stepMain</div>;
}
