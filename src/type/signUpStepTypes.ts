export interface StepPropsType{
    step:string;
    setStep:React.Dispatch<React.SetStateAction<string>>;  
    // userData:string[];
    setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType | undefined>>
  }
  
export interface SetStepPropsType {
    setStep:React.Dispatch<React.SetStateAction<string>>;  
}

export interface SetPropsType {
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType | undefined>>
}

export interface OnlyStepPropsType {
  step:string;
}

export interface ContinueButtonPropsTypes{
  successNextStep:string;
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
}

export interface UserDataPropsType{
  imageFile:File;
  ID:string;
  PW:string;
  name:string;
}