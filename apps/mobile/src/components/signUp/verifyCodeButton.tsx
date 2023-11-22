import styled from "styled-components";
import { VerifySignupIc } from "../../assets";

interface VerifyCodeButtonProp {
  isActive: boolean;
}

export default function VerifyCodeButton(props: VerifyCodeButtonProp) {
  const { isActive } = props;

  return (
    <VerifyCodeButtonWrapper isActive={isActive}>
      <VerifySignupIcon />
      <VerifyCodeBtn type="submit" />
    </VerifyCodeButtonWrapper>
  );
}

const VerifyCodeBtn = styled.input`
  display: none;
`;

const VerifySignupIcon = styled(VerifySignupIc)`
  width: 5rem;
`;

const VerifyCodeButtonWrapper = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 12.7rem;
  height: 4rem;

  margin-left: 1rem;
  margin-top: -2.5rem;

  border-radius: 5rem;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.main : theme.colors.gray4)};
`;
