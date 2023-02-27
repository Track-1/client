import { useState } from "react";
import styled from "styled-components";
import { MainInfoProducerIc, MainInfoVocalIc, MainLogoutIc } from "../../assets";
import thumbnailImg from "../../assets/image/thumbnailImg.png";
export default function VocalBriefInfo() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function hoverProfile() {
    setIsHovered(true);
  }

  function hoverOutProfile() {
    setIsHovered(false);
  }

  return (
    <>
      <InfoContainer onMouseEnter={hoverProfile} onMouseLeave={hoverOutProfile}>
        <ProfileImage src={thumbnailImg} />
        <UserName>_Bepore</UserName>
      </InfoContainer>
      {isHovered && (
        <UserInfoContainer>
          <InfoBox>
            <ImageWrapper>
              <InfoProfileImage src={thumbnailImg} />
            </ImageWrapper>
            <TextWrapper>
              <InfoUserName>_Bepor</InfoUserName>
              <MainInfoVocalIc />
              <UserEmail>pianowell@gmail.com</UserEmail>
            </TextWrapper>
          </InfoBox>
          <LogoutBox>
            Log out
            <MainLogoutIc />
          </LogoutBox>
        </UserInfoContainer>
      )}
    </>
  );
}

const InfoContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5.2rem;
  width: 19.5rem;
  padding: 0 2.2rem 0 1.3rem;

  background-color: ${({ theme }) => theme.colors.sub2};

  border-radius: 3rem;
`;

const ProfileImage = styled.img`
  height: 3.2rem;
  width: 3.2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
`;

const UserName = styled.strong`
  ${({ theme }) => theme.fonts.id}
`;

const UserInfoContainer = styled.section`
  position: absolute;
  top: 12.4rem;
  right: 7.1rem;

  height: 17.1rem;
  width: 37.1rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 0.5rem;
`;

const InfoBox = styled.div`
  display: flex;

  margin-top: 1.7rem;
  padding-bottom: 1.7rem;
  padding-left: 2.2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 5.5rem;
  width: 5.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;

  transform: rotate(45deg);
  overflow: hidden;
  border-radius: 0.5rem;
`;

const InfoProfileImage = styled.img`
  height: 10rem;
  width: 10rem;

  margin-left: 2.2rem;

  transform: rotate(-45deg);
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 1.8rem;
`;

const InfoUserName = styled.strong`
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;

const UserEmail = styled.strong`
  margin-top: 0.9rem;

  ${({ theme }) => theme.fonts.description}

  color: ${({ theme }) => theme.colors.gray3};
`;

const LogoutBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5.7rem;
  padding: 0 1.1rem 0 2.2rem;

  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.white};
`;
