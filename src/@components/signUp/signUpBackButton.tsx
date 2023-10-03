import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignupBackBtnIc } from "../../assets";

export default function SignUpBackButton() {
  const navigate = useNavigate();
  function handleMovePreviousPage() {
    if (window.confirm("Are you sure to terminate to signing up?\n회원가입을 종료하시겠습니까?")) {
      navigate("/");
    }
  }

  return (
    <>
      <SignupBackBtnIcon onClick={handleMovePreviousPage} />
    </>
  );
}

const SignupBackBtnIcon = styled(SignupBackBtnIc)`
  width: 11.4rem;
`;
