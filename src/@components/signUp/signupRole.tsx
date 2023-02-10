import { useState } from 'react';
import styled from 'styled-components'
import { SignupNotSelectedProducerIc, SignupNotSelectedVocalIc, SignupSelectedProducerIc, SignupSelectedVocalIc, SignUpSelectRoleTitleIc } from '../../assets'
import { currentUser } from '../../core/constants/userType';
import { SetStepPropsType } from '../../type/signUpStepTypes';

export default function SignupRole(props:SetStepPropsType) {
    const {setStep}=props;
    const [hoveredRole, setHoveredRole] = useState<string>('')

    function hoverRole(role:string){
      setHoveredRole(role)
    }

    function hoverOut(){
      setHoveredRole('')
    }

    function isProducerHovered(){
      return hoveredRole===currentUser.PRODUCER
    }

    function isVocalHovered(){
      return hoveredRole===currentUser.VOCAL
    }

  return (
    <>
    <SignUpSelectRoleTitleIc/>

    {isProducerHovered()?<SignupSelectedProducerIc/>:<SignupNotSelectedProducerIc onMouseEnter={()=>hoverRole(currentUser.PRODUCER)} onMouseOut={hoverOut}/>}
    {isVocalHovered()?<SignupSelectedVocalIc/>:<SignupNotSelectedVocalIc onMouseEnter={()=>hoverRole(currentUser.VOCAL)} onMouseOut={hoverOut}/>}    
    
    </>
  )
}
