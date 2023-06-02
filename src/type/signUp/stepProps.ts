export interface StepProp {
  step: string;
}
export interface SetStepProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepMainProps extends StepProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}
