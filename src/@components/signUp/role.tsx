import { useState } from "react";
import styled from "styled-components";
import {
  SignupRoleProducerHoverIc,
  SignupRoleProducerIc,
  SignupRoleTitleIc,
  SignupRoleVocalHoverIc,
  SignupRoleVocalIc,
} from "../../assets";
import { ROLE } from "../../core/signUp/roleType";

export interface SetStepProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function Role(props: SetStepProp) {
  const { setStep } = props;
  const [hoverRole, setHoverRole] = useState<string>("");
  const [clickRole, setClickRole] = useState<string>("");

  function handleHoverRole(role: string) {
    setHoverRole(role);
  }

  function handleClickRole(role: string) {
    setClickRole(role);
  }

  function isActive(role: string) {
    return hoverRole === role || clickRole === role;
  }

  function isProducer(role: string) {
    return role === ROLE.PRODUCER;
  }

  return (
    <RoleWrapper>
      <SignupRoleTitleIcon />
      <RoleBox
        onClick={() => handleClickRole(ROLE.PRODUCER)}
        onMouseEnter={() => handleHoverRole(ROLE.PRODUCER)}
        onMouseLeave={() => handleHoverRole("")}
        isProducer={isProducer(ROLE.PRODUCER)}>
        {isActive(ROLE.PRODUCER) ? <SignupRoleProducerHoverIc /> : <SignupRoleProducerIc />}
      </RoleBox>
      <RoleBox
        onClick={() => handleClickRole(ROLE.VOCAL)}
        onMouseEnter={() => handleHoverRole(ROLE.VOCAL)}
        onMouseLeave={() => handleHoverRole("")}
        isProducer={isProducer(ROLE.VOCAL)}>
        {isActive(ROLE.VOCAL) ? <SignupRoleVocalHoverIc /> : <SignupRoleVocalIc />}
      </RoleBox>
    </RoleWrapper>
  );
}

const RoleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* 
  height: 49.5rem;
  margin-top: 8rem; */
`;

const RoleBox = styled.article<{ isProducer: boolean }>`
  margin-top: ${({ isProducer }) => (isProducer ? 3.3 : 1.4)}rem;

  cursor: pointer;
`;

const SignupRoleTitleIcon = styled(SignupRoleTitleIc)`
  margin-top: 8rem;
`;
