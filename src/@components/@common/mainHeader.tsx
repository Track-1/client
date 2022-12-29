import styled from "styled-components";

import logoIc from "../../assets/icon/logoIC.svg";
import sloganImg from "../../assets/image/sloganImg.svg";
import userIc from "../../assets/icon/userIC.svg";
import mypageTextIc from "../../assets/icon/userIC.svg";

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <img src={logoIc} alt="로고" />
        <img src={sloganImg} alt="슬로건" />
        <MyPageBtn type="button">
          <UserImg src={userIc} alt="userImage" />
          <MyPageText src={mypageTextIc} alt="mypage" />
        </MyPageBtn>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  height: 143px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 69px 0 75px;
`;

const MyPageBtn = styled.button`
  width: 195px;
  height: 52px;

  display: flex;
  align-items: center;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #ffffff;
`;

const UserImg = styled.img`
  width: 31px;
  height: 31px;

  margin-left: 13px;
  border-radius: 50px;
  border: 1px solid white;
`;

const MyPageText = styled.img`
  margin-left: 13px;
`;
