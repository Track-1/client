import { EditDataType } from "./editDataType";

export interface UserDataPropsType{
  imageFile: File | Blob | FormData;
  ID:string;
  PW:string;
  name:string;
  isAgree:String;
}

export interface StepPropsType{
    step:string;
    setStep:React.Dispatch<React.SetStateAction<string>>;  
    setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}

export interface StepUserPropsType{
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  userData:UserDataPropsType;
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
  userProfile:EditDataType
  setUserProfile: React.Dispatch<React.SetStateAction<EditDataType>>
}

export interface SetStepPropsType {
    setStep:React.Dispatch<React.SetStateAction<string>>;  
}

export interface SetPropsType {
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}


export interface SetUserPropsType {
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  userData:UserDataPropsType;
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}

export interface OnlyStepPropsType {
  step:string;
}

export interface ContinueButtonPropsTypes{
  successNextStep:string;
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
}

export interface SignupMessagePropsType{
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  userProfile:EditDataType
  setUserProfile: React.Dispatch<React.SetStateAction<EditDataType>>

}

export interface SignupProfilePropsTye{
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  userProfile:EditDataType
  setUserProfile: React.Dispatch<React.SetStateAction<EditDataType>>

}