import styled from "styled-components";
import { LoginIc, SignupIc } from "../../assets";
import { useNavigate } from "react-router-dom";
import MypageButton from "./mypageButton";
import { checkIsLogin } from "../../utils/common/checkIsLogined";
import { useGetProducerProfile, useGetVocalProfile } from "../../hooks/queries/mypage";
import { ROLE } from "../../core/common/roleType";
import { useRecoilValue } from "recoil";
import { loginUserId, loginUserType } from "../../recoil/common/loginUserData";

export default function LoginButton() {
  const isLogined = checkIsLogin();

  const userType = useRecoilValue(loginUserType);
  const userId = useRecoilValue(loginUserId);

  const { vocalProfile } = useGetVocalProfile(userId, userType);
  const { producerProfile } = useGetProducerProfile(userId, userType);

  const navigate = useNavigate();

  function getUserImage() {
    return userType === ROLE.PRODUCER
      ? producerProfile?.userProfile.userImageFile
      : vocalProfile?.userProfile.userImageFile;
  }

  function getUserName() {
    return userType === ROLE.PRODUCER ? producerProfile?.userProfile.userName : vocalProfile?.userProfile.userName;
  }

  function getUserContact() {
    return userType === ROLE.PRODUCER
      ? producerProfile?.userProfile.userContact
      : vocalProfile?.userProfile.userContact;
  }

  function handleMoveLogin() {
    navigate("/login");
  }
  function handleMoveSignUp() {
    navigate("/signup");
  }

  return (
    <>
      <LoginButtonWrapper>
        {isLogined ? (
          <MypageButton
            userType={userType}
            userImage={getUserImage()}
            userName={getUserName()}
            userContact={getUserContact()}
          />
        ) : (
          <>
            <LoginIcon onClick={handleMoveLogin} />
            <SignUpIcon onClick={handleMoveSignUp} />
          </>
        )}
      </LoginButtonWrapper>
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
