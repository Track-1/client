import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { MainInfoProducerIc, MainInfoVocalIc, MainLogoutIc } from "../../assets";
import thumbnailImg from "../../assets/image/vocalPortfolioList5.png";
import { onLogout } from "../../core/api/logout";
import { getVocalProfile } from "../../core/api/vocalProfile";
import { UserPropsType } from "../../type/userPropsType";
import { VocalProfileType } from "../../type/vocalProfile";
import { getCookie, removeCookie } from "../../utils/cookie";

export default function VocalBriefInfo(props:UserPropsType) {
  const {userId}=props;

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<VocalProfileType>();

  function hoverProfile() {
    setIsHovered(true);
  }

  function hoverOutProfile() {
    setIsHovered(false);
  }

  const { data } = useQuery(["profile",userId], ()=>getVocalProfile(userId, 1)
  , {
    refetchOnWindowFocus: false, 
    retry: 0, 
    onSuccess: data => {
        setProfileData(data.vocalProfile)
    },
    onError: error => {
      console.log("실패");
    }
  });

  async function logout (){
    onLogout();
  }

  console.log(getCookie("accessToken"))

  return (
    <div onMouseEnter={hoverProfile} onMouseLeave={hoverOutProfile}>
      <InfoContainer>
        <ProfileImageWrapper>
          <ProfileImage src={profileData?.profileImage} />
        </ProfileImageWrapper>
        <UserName>{profileData?.name}</UserName>
      </InfoContainer>
      <Blank></Blank>
      {isHovered && (
        <UserInfoContainer>
          <InfoBox>
            <ImageWrapper>
              <InfoProfileImage src={profileData?.profileImage} />
            </ImageWrapper>
            <TextWrapper>
              <InfoUserName>{profileData?.name}</InfoUserName>
              <MainInfoVocalIc />
              <UserEmail>{profileData?.contact}</UserEmail>
            </TextWrapper>
          </InfoBox>
          <LogoutBox onClick={logout}>
            Log out
            <MainLogoutIc />
          </LogoutBox>
        </UserInfoContainer>
      )}
    </div>
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

  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;

  height: 2.8rem;
  width: 2.8rem;

  transform: rotate(45deg);
  overflow: hidden;
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black};
`;

const ProfileImage = styled.img`
  height: 6rem;
  width: 6rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;

  transform: rotate(-45deg);
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

  cursor: pointer;
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

const Blank=styled.div`
  position: absolute;
  width: 20rem;
  height: 3rem;
`