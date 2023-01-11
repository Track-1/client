import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import sloganImg from "../../assets/image/sloganImg.svg";
import { LogoIc, ProducerMypageIc, ProducerToggleIc, VocalMypageIc, VocalToggleIc } from "../../assets";
import { useRecoilState } from "recoil";
import { UserType } from "../../recoil/main";

export default function MainHeader() {
  const navigate = useNavigate();

  const [userType, setUserType] = useRecoilState(UserType);

  function moveMyPage() {
    userType === "producer" ? navigate("/producer-profile/8") : navigate("/vocal-profile/1", {state:1});
  }

  function changeUserType(e: React.MouseEvent<SVGSVGElement>) {
    userType === "producer" ? setUserType("vocal") : setUserType("producer");
  }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoIc style={{ cursor: "pointer" }} />
        <img src={sloganImg} alt="슬로건" />
        <BtnWrpper>
          {userType === "producer" ? (
            <>
              <ProducerToggleIc style={{ cursor: "pointer" }} onClick={changeUserType} />
              <ProducerMypageIc style={{ cursor: "pointer" }} onClick={moveMyPage} />
            </>
          ) : (
            <>
              <VocalToggleIc style={{ cursor: "pointer" }} onClick={changeUserType} />
              <VocalMypageIc style={{ cursor: "pointer" }} onClick={moveMyPage} />
            </>
          )}
        </BtnWrpper>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 14.3rem;

  position: fixed;
  z-index: 999;
`;

const HeaderWrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 6.9rem 0 7.5rem;
`;

const BtnWrpper = styled.div`
  width: 29rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
