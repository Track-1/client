import styled from "styled-components";
import logo from "../../assets/image/logo.svg";
import slogan from "../../assets/image/slogan.svg";
import userImg from "../../assets/image/userImg.svg";

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <img src={logo} alt="로고" />
        <img src={slogan} alt="슬로건" />
        <MyPageBtn type="button">
          <UserImg src={userImg} />
          My Page
        </MyPageBtn>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
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
  margin: 20px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main};
`;

const UserImg = styled.img`
  width: 31px;
  height: 31px;

  border-radius: 50px;
  border: 1px solid white;
`;
