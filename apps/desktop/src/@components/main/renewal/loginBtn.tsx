import styled, { CSSProperties } from "styled-components";
import SamllButton from "../../@common/button/customButton";
import { theme } from "../../../style/theme";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../../../context/playerContext";
import { useNavigate } from "react-router-dom";
import { checkIsLogin } from "../../../utils/common/checkIsLogined";
import { useRecoilValue } from "recoil";
import { loginUserId, loginUserType } from "../../../recoil/common/loginUserData";
import { useGetProducerProfile, useGetVocalProfile } from "../../../hooks/queries/mypage";
import { ROLE } from "../../../core/common/roleType";
import useModal from "../../../hooks/common/useModal";
import ProfileBox from "./profileBox";

export default function LoginBtn() {
  const { quitAudioForMovePage } = useContext(PlayerContext);

  const isLogined = checkIsLogin();

  const userType = useRecoilValue(loginUserType);
  const userId = useRecoilValue(loginUserId);

  const { openModal, unShowModal, handleShowUpdateModal } = useModal();

  const { vocalProfile } = useGetVocalProfile(userId, userType);
  const { producerProfile } = useGetProducerProfile(userId, userType);

  const navigate = useNavigate();

  useEffect(() => {
    unShowModal();
  }, []);

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

  function handleMoveToLogin() {
    quitAudioForMovePage();
    navigate("/login", {
      state: {
        prevURL: "/",
      },
    });
  }

  function handleMoveToSignup() {
    quitAudioForMovePage();
    navigate("/signup");
  }

  return (
    <Styled.LoginBtnWrapper>
      {isLogined ? (
        <Styled.LoginedInfoWrapper userType={userType} onClick={handleShowUpdateModal}>
          <Styled.LoginedUserImage src={getUserImage()} userType={userType} />
          {getUserName()}
          {openModal && <ProfileBox userType={userType} userName={getUserName()} userContact={getUserContact()} />}
        </Styled.LoginedInfoWrapper>
      ) : (
        <>
          <SamllButton btnStyle={LoginBtnStyle} handleClickFunction={handleMoveToLogin}>
            Login
          </SamllButton>
          <SamllButton btnStyle={SignupBtnStyle} handleClickFunction={handleMoveToSignup}>
            Sign up
          </SamllButton>
        </>
      )}
    </Styled.LoginBtnWrapper>
  );
}

const Styled = {
  LoginBtnWrapper: styled.div`
    display: flex;

    cursor: pointer;
  `,

  LoginedInfoWrapper: styled.div<{ userType: string }>`
    display: flex;
    align-items: center;
    min-width: 19.5rem;

    width: 100%;
    height: 100%;

    color: ${(props) => (props.userType === ROLE.PRODUCER ? theme.colors.sub1 : theme.colors.sub2)};
    ${({ theme }) => theme.fonts.pretendard_text22};
  `,

  LoginedUserImage: styled.img<{ userType: string }>`
    width: 5rem;
    height: 5rem;

    margin-right: 1rem;

    border-radius: 50%;

    border: 0.2rem solid;
    border-color: ${(props) => (props.userType === ROLE.PRODUCER ? theme.colors.sub1 : theme.colors.sub3)};
  `,
};

const LoginBtnStyle: CSSProperties = {
  fontFamily: "Pretendard",
  fontWeight: 500,
  fontSize: "2.2rem",
  lineHeight: "normal",

  width: "17.6rem",
  height: "4.9rem",

  color: `${theme.colors.white}`,
  background: `${theme.colors.black}`,

  border: `0.1rem solid ${theme.colors.white}`,
  borderRadius: "3rem",
};

const SignupBtnStyle: CSSProperties = {
  fontFamily: "Pretendard",
  fontWeight: 500,
  fontSize: "2.2rem",
  lineHeight: "normal",

  width: "17.6rem",
  height: "4.9rem",

  color: `${theme.colors.black}`,

  background: `${theme.colors.white}`,
  borderRadius: "3rem",

  marginLeft: "2rem",
};
