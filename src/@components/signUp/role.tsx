export interface SetStepProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function Role(props: SetStepProp) {
  const { setStep } = props;

  return <div>role</div>;
}
