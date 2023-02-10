export interface StepPropsTypes{
    step:string;
    setStep:React.Dispatch<React.SetStateAction<string>>;  
  }
  
export interface SetStepPropsType {
    setStep:React.Dispatch<React.SetStateAction<string>>;  
}
  
export interface StepPropsType {
  step:string;
}

export interface ContinueButtonPropsTypes{
  answer:string;
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
}
