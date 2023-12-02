import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { LoginIc, SignupIc } from "../../assets";
import { ROLE } from "../../core/common/roleType";
import { useGetProducerProfile, useGetVocalProfile } from "../../hooks/queries/mypage";
import { loginUserId, loginUserType } from "../../recoil/common/loginUserData";
import { checkIsLogin } from "../../utils/common/checkIsLogined";
import MypageButton from "./mypageButton";

export default function LoginButton() {
  const prevURL = useLocation().pathname;

  const isLogined = checkIsLogin();

  const userType = useRecoilValue(loginUserType);
  const userId = useRecoilValue(loginUserId);

  const { vocalProfile } = useGetVocalProfile(userId);
  const { producerProfile } = useGetProducerProfile(userId);

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
    navigate("/login", {
      state: {
        prevURL: prevURL,
      },
    });
  }
  function handleMoveSignUp() {
    navigate("/signup", {
      state: {
        prevURL: prevURL,
      },
    });
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
  height: 5.2rem;
  cursor: pointer;
`;

const SignUpIcon = styled(SignupIc)`
  width: 19.5rem;
  height: 5.2rem;

  margin-left: 2.2rem;

  cursor: pointer;
`;
