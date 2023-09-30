import styled from "styled-components";
import { LoginIc, SignupIc } from "../../assets";
import { useNavigate } from "react-router-dom";
import MypageButton from "./mypageButton";
import ProfileBox from "./profileBox";
import { checkIsLogin } from "../../utils/common/checkIsLogined";

export default function LoginButton() {
  const isLogined = checkIsLogin();

  const navigate = useNavigate();

  function handleMoveLogin() {
    navigate("/login");
  }
  function handleMoveSignUp() {
    navigate("/signup");
  }

  const userType = "vocal";

  return (
    <>
      <LoginButtonWrapper>
        {isLogined ? (
          <>
            <LoginIcon onClick={handleMoveLogin} />
            <SignUpIcon onClick={handleMoveSignUp} />
          </>
        ) : (
          <MypageButton userType={userType} />
        )}
      </LoginButtonWrapper>
      <ProfileBox userType={userType} />
    </>
  );
}

const LoginButtonWrapper = styled.div`
  display: flex;
`;

const LoginIcon = styled(LoginIc)`
  width: 15.9rem;
  cursor: pointer;
`;

const SignUpIcon = styled(SignupIc)`
  width: 19.5rem;

  margin-left: 2.2rem;

  cursor: pointer;
`;
