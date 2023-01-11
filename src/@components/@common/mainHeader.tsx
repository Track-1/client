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
    navigate("/mypage");
  }

  function changeUserType(e: React.MouseEvent<SVGSVGElement>) {
    userType === "producer" ? setUserType("vocal") : setUserType("producer");
  }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoIc />
        <img src={sloganImg} alt="슬로건" />
        <BtnWrpper>
          {userType === "producer" ? (
            <>
              <ProducerToggleIc onClick={changeUserType} />
              <ProducerMypageIc onClick={moveMyPage} />
            </>
          ) : (
            <>
              <VocalToggleIc onClick={changeUserType} />
              <VocalMypageIc onClick={moveMyPage} />
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
