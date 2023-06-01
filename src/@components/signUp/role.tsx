import styled from "styled-components";
import { SignupRoleProducerIc, SignupRoleTitleIc, SignupRoleVocalIc } from "../../assets";

export interface SetStepProp {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function Role(props: SetStepProp) {
  const { setStep } = props;

  return (
    <RoleWrapper>
      <SignupRoleTitleIc />
      <SignupRoleProducerIc />
      <SignupRoleVocalIc />
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
