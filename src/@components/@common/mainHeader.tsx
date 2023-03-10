import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import sloganImg from "../../assets/image/sloganImg.svg";
import { TrackOneMainLogoIc, LoginIc, SignupIc } from "../../assets";
import { useRecoilState } from "recoil";
import { UserType } from "../../recoil/main";
import { useState } from "react";
import ProducerBriefInfo from "../main/produderBriefInfo";
import VocalBriefInfo from "../main/vocalBriefInfo";

export default function MainHeader() {
  const navigate = useNavigate();

  const [userType, setUserType] = useRecoilState(UserType);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  function moveToLogin(){
    navigate("/login");
  }

  function moveToSignup(){
    navigate("/sign-up");
  }


  return (
    <HeaderContainer>
      <HeaderWrapper>
        <TrackOneMainLogoIc style={{ cursor: "pointer" }} />
        <img src={sloganImg} alt="슬로건" />
        {!isLogin && (
          <BtnWrpper>
            <LoginIcon onClick={moveToLogin}/>
            <SignupIc onClick={moveToSignup}/>
          </BtnWrpper>
        )}
        {isLogin && userType === "producer" && <ProducerBriefInfo />}
        {isLogin && userType === "vocal" && <VocalBriefInfo />}
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
