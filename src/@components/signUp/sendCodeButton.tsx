import styled from "styled-components";
import { ResendSignupIc, SendCodeSignupIc } from "../../assets";

interface SendCodeButtonProps {
  isActive: boolean;
  isResend: boolean;
}

export default function SendCodeButton(props: SendCodeButtonProps) {
  const { isActive, isResend } = props;

  return (
    <SendCodButtonWrapper isActive={isActive}>
      {isResend ? <ResendSignupIcon /> : <SendCodeSignupIcon />}
      <SendCodeBtn type="submit" />
    </SendCodButtonWrapper>
  );
}

const SendCodButtonWrapper = styled.label<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 1rem;

  width: 12.7rem;
  height: 4rem;

  border-radius: 5rem;

  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.main : theme.colors.gray4)};
  border-radius: 2.2rem;

  cursor: pointer;
`;

const SendCodeBtn = styled.input`
  display: none;
`;

const SendCodeSignupIcon = styled(SendCodeSignupIc)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.3rem;
`;

const ResendSignupIcon = styled(ResendSignupIc)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.3rem;
`;
