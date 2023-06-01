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

  console.log(hoverRole);

  return (
    <RoleWrapper>
      <SignupRoleTitleIc />
      <div
        onClick={() => handleClickRole(ROLE.PRODUCER)}
        onMouseEnter={() => handleHoverRole(ROLE.PRODUCER)}
        onMouseLeave={() => handleHoverRole("")}>
        {isActive(ROLE.PRODUCER) ? <SignupRoleProducerHoverIc /> : <SignupRoleProducerIc />}
      </div>
      <div
        onClick={() => handleClickRole(ROLE.VOCAL)}
        onMouseEnter={() => handleHoverRole(ROLE.VOCAL)}
        onMouseLeave={() => handleHoverRole("")}>
        {isActive(ROLE.VOCAL) ? <SignupRoleVocalHoverIc /> : <SignupRoleVocalIc />}
      </div>
    </RoleWrapper>
  );
}

const RoleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 49.5rem;
  margin-top: 8rem;
`;
