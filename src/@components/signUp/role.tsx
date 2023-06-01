export interface StepProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function Role(props: StepProp) {
  const { setStep } = props;

  return <div>role</div>;
}
