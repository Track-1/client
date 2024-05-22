export interface StepProp {
  step: number;
}
export interface SetStepProp {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface StepMainProps extends StepProp {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
