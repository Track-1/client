import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import sloganImg from "../../assets/image/sloganImg.svg";
import { UserIc, LogoIc, MyPageTextIc } from "../../assets/index";

export default function MainHeader() {
  const navigate = useNavigate();

  function moveMyPage() {
    navigate("/mypage");
  }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoIc />
        <img src={sloganImg} alt="슬로건" />
        <MyPageBtn type="button" onClick={moveMyPage}>
          <UserIcon />
          <MyPageTextIcon />
        </MyPageBtn>
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

const MyPageBtn = styled.button`
  width: 19.5rem;
  height: 5.2rem;

  display: flex;
  align-items: center;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.colors.main};
`;

const UserIcon = styled(UserIc)`
  width: 3.1rem;
  height: 3.1rem;

  margin-left: 1.3rem;
  border-radius: 5rem;
  border: 0.1rem solid white;
`;

const MyPageTextIcon = styled(MyPageTextIc)`
  margin-left: 1.3rem;
`;
