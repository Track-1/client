import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import sloganImg from "../../assets/image/sloganImg.svg";
import { TrackOneMainLogoIc, LoginIc, SignupIc, TrackheadersloganIc } from "../../assets";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserType } from "../../recoil/main";
import { useEffect, useState } from "react";
import ProducerBriefInfo from "../main/produderBriefInfo";
import VocalBriefInfo from "../main/vocalBriefInfo";
import { getCookie } from "../../utils/cookie";
import { LoginUserId, LoginUserImg, LoginUserType } from "../../recoil/loginUserData";
import { isProducer, isVocal } from "../../utils/common/userType";

export default function MainHeader() {
  const navigate = useNavigate();
  const userType = useRecoilValue(LoginUserType);
  const userId = useRecoilValue(LoginUserId);

  function moveToLogin() {
    navigate("/login");
  }

  function moveToSignup() {
    navigate("/sign-up");
  }

  function moveToHome() {
    navigate("/");
  }

  function isLogin() {
    return getCookie("accessToken") !== undefined;
  }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <TrackOneMainLogoIcon/>
        <TrackheadersloganIcon/>
        {/* <Img src={sloganImg} alt="슬로건" /> */}
        {!isLogin() && (
          <BtnWrpper>
            <LoginIcon onClick={moveToLogin}/>
            <SignupIc onClick={moveToSignup}/>
          </BtnWrpper>
        )}
        
        {isLogin() && isProducer(userType) && <ProducerBriefInfo userId={userId} />}
        {isLogin() && isVocal(userType) && <VocalBriefInfo userId={userId}/>}
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 14.3rem;
  position: fixed;
`;

const HeaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5.9rem 7.5rem;
`;

const BtnWrpper = styled.div`
  width: 29rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const LoginIcon = styled(LoginIc)`
  margin-right: 2.2rem;
`;

const TrackheadersloganIcon=styled(TrackheadersloganIc)`
  position: absolute;
  margin-left: 74rem;
  width: 35rem;
`

const TrackOneMainLogoIcon=styled(TrackOneMainLogoIc)`
  width: 26.3rem;
  cursor: pointer;
`