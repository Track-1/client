import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MainInfoProducerIc, MainLogoutIc } from "../../assets";
import thumbnailImg from "../../assets/image/thumbnailImg.png";
import { onLogout } from "../../core/api/logout";
import { getProducerPortfolio } from "../../core/api/producerProfile";
import { LoginUserImg } from "../../recoil/loginUserData";
import { reload } from "../../recoil/main";
import { ProducerProfileType } from "../../type/producerProfile";
import { UserPropsType } from "../../type/userPropsType";

export default function ProducerBriefInfo(props: UserPropsType) {
  const { userId } = props;
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [loginUserImg, setLoginUserImg] = useRecoilState(LoginUserImg);
  const [isReload, setIsReload]=useRecoilState<boolean>(reload);

  function changeProfileBoxDisplay() {
    setIsShow(!isShow);
  }

  const { data } = useQuery(["profile", userId], () => getProducerPortfolio(userId, 1), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      setLoginUserImg(data.producerProfile.profileImage);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function logout() {
    onLogout();
    navigate("/");
  }

  function moveToMypage() {
    navigate(`/producer-profile/${userId}`, { state: userId });
    setIsReload(false)
  }

  return (
    <div onClick={changeProfileBoxDisplay}>
      <InfoContainer>
        <ProfileImageWrapper>
          <ProfileImage src={data?.producerProfile?.profileImage} />
        </ProfileImageWrapper>
        <UserName>{data?.producerProfile?.name}</UserName>
      </InfoContainer>
      <Blank></Blank>
      {isShow && (
        <UserInfoContainer>
          <InfoBox onClick={moveToMypage}>
            <InfoProfileImageWrapper>
            <InfoProfileImage src={data?.producerProfile?.profileImage} onClick={moveToMypage} />
            </InfoProfileImageWrapper>
            <TextWrapper>
              <InfoUserName>{data?.producerProfile?.name}</InfoUserName>
              <MainInfoProducerIc />
              <UserEmail>{data?.producerProfile?.contact}</UserEmail>
            </TextWrapper>
          </InfoBox>
          <LogoutBox onClick={logout}>
            Log out
            <MainLogoutIcon />
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
  padding: 0 2.2rem 0 1.3rem;

  background-color: ${({ theme }) => theme.colors.sub1};

  border-radius: 3rem;

  cursor: pointer;
`;

const ProfileImage = styled.img`
  height:100%;
  width:100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const ProfileImageWrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3.2rem;
  width: 3.2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 10rem;

  position: absolute;
  overflow: hidden;
`

const UserName = styled.strong`
  margin-left:4rem;
  
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

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
`;

const InfoProfileImage = styled.img`
  height:100%;
  width:100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const InfoProfileImageWrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  height: 8rem;
  width: 8rem;
  margin: 0.5rem 0 0 2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 10rem;

  overflow: hidden;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem 0 2.5rem 12rem;
`;

const InfoUserName = styled.strong`
  width: 22.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;

const UserEmail = styled.strong`
  margin-top: 0.9rem;

  width: 22.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme }) => theme.fonts.description}

  color: ${({ theme }) => theme.colors.gray3};
`;

const LogoutBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5.7rem;
  padding: 0 1.1rem 1rem 2.2rem;

  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.white};
`;

const Blank = styled.div`
  position: absolute;
  width: 50rem;
  height: 3rem;
`;

const MainLogoutIcon = styled(MainLogoutIc)`
  width: 4rem;
  height: 4rem;
`;
