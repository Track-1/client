import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  SignupRoleProducerHoverIc,
  SignupRoleProducerIc,
  SignupRoleTitleIc,
  SignupRoleVocalHoverIc,
  SignupRoleVocalIc,
} from "../../assets";
import { ROLE } from "../../core/signUp/roleType";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { signupRole } from "../../recoil/signUp/role";

export default function Role() {
  const [hoverRole, setHoverRole] = useState<string>("");
  const [clickRole, setClickRole] = useRecoilState<string>(signupRole);
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

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

  useEffect(() => {
    clickRole !== "" && setIsSuccess(true);
  }, [clickRole]);

  return (
    <RoleWrapper>
      <SignupRoleTitleIcon />
      <RoleBox
        onClick={() => handleClickRole(ROLE.PRODUCER)}
        onMouseEnter={() => handleHoverRole(ROLE.PRODUCER)}
        onMouseLeave={() => handleHoverRole("")}
        isProducer={isProducer(ROLE.PRODUCER)}>
        {isActive(ROLE.PRODUCER) ? <SignupRoleProducerHoverIcon /> : <SignupRoleProducerIcon />}
      </RoleBox>
      <RoleBox
        onClick={() => handleClickRole(ROLE.VOCAL)}
        onMouseEnter={() => handleHoverRole(ROLE.VOCAL)}
        onMouseLeave={() => handleHoverRole("")}
        isProducer={isProducer(ROLE.VOCAL)}>
        {isActive(ROLE.VOCAL) ? <SignupRoleVocalHoverIcon /> : <SignupRoleVocalIcon />}
      </RoleBox>
    </RoleWrapper>
  );
}

const RoleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const RoleBox = styled.article<{ isProducer: boolean }>`
  margin-top: ${({ isProducer }) => (isProducer ? 3.3 : 1.4)}rem;

  cursor: pointer;
`;

const SignupRoleTitleIcon = styled(SignupRoleTitleIc)`
  width: 48.2rem;
  margin-top: 8rem;
`;

const SignupRoleProducerHoverIcon = styled(SignupRoleProducerHoverIc)`
  width: 62rem;
  height: 21.5rem;
`;

const SignupRoleProducerIcon = styled(SignupRoleProducerIc)`
  width: 62rem;
  height: 21.5rem;
`;

const SignupRoleVocalHoverIcon = styled(SignupRoleVocalHoverIc)`
  width: 62rem;
  height: 21.5rem;
`;

const SignupRoleVocalIcon = styled(SignupRoleVocalIc)`
  width: 62rem;
  height: 21.5rem;
`;
