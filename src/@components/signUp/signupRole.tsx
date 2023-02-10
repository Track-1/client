import { useState } from 'react';
import styled from 'styled-components'
import { SignupNotSelectedProducerIc, SignupNotSelectedVocalIc, SignupSelectedProducerIc, SignupSelectedVocalIc, SignUpSelectRoleTitleIc } from '../../assets'
import { currentUser } from '../../core/constants/userType';
import { SetStepPropsType } from '../../type/signUpStepTypes';

export default function SignupRole(props:SetStepPropsType) {
    const {setStep}=props;
    const [hoveredRole, setHoveredRole] = useState<string>('')
    const [selectedRole, setSelectedRole] = useState<string>('')

    function hoverRole(role:string){
      setHoveredRole(role)
    }

    function hoverOut(){
      setHoveredRole("not")
    }

    function selectRole(role:string){
      setSelectedRole(role)
    }

    function checkHoveredRole(role:string){
      return hoveredRole===role
    }

    function checkSelectedRole(role:string){
      return selectedRole===role
    }

    console.log(hoveredRole)

  return (
    <RoleWrapper>
      <SignUpSelectRoleTitleIc/>

      {checkHoveredRole(currentUser.PRODUCER)||checkSelectedRole(currentUser.PRODUCER)?<SignupSelectedProducerIcon onClick={()=>selectRole(currentUser.PRODUCER)} onMouseEnter={()=>hoverRole(currentUser.PRODUCER)} onMouseOut={hoverOut}/>:<SignupNotSelectedProducerIcon onMouseEnter={()=>hoverRole(currentUser.PRODUCER)} onMouseOut={hoverOut}/>}
      {checkHoveredRole(currentUser.VOCAL)||checkSelectedRole(currentUser.VOCAL)?<SignupSelectedVocalIcon onClick={()=>selectRole(currentUser.VOCAL)} onMouseEnter={()=>hoverRole(currentUser.VOCAL)} onMouseOut={hoverOut}/>:<SignupNotSelectedVocalIcon onMouseEnter={()=>hoverRole(currentUser.VOCAL)} onMouseOut={hoverOut}/>}    
    
    </RoleWrapper>
  )
}

const RoleWrapper=styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 7.7rem;
`

const SignupSelectedProducerIcon=styled(SignupSelectedProducerIc)`
  margin:3.3rem 0 1.4rem 0;

  cursor: pointer;
`

const SignupNotSelectedProducerIcon=styled(SignupNotSelectedProducerIc)`
  margin:3.3rem 0 1.4rem 0;

  cursor: pointer;
`

const SignupSelectedVocalIcon=styled(SignupSelectedVocalIc)`
  cursor: pointer;
`

const SignupNotSelectedVocalIcon=styled(SignupNotSelectedVocalIc)`
  cursor: pointer;
`