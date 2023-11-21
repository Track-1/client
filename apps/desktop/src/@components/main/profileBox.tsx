import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { LogoutIc, ProducerTextIc, VocalTextIc } from "../../assets";
import { ROLE } from "../../core/common/roleType";
import { useLogout } from "../../hooks/queries/user";
import { loginUserId } from "../../recoil/common/loginUserData";
import { ProducerProfileImage } from "./mypageButton";

interface ProfileBoxProps {
  userType: string;
  userImage: string | undefined;
  userName: string | undefined;
  userContact: string | undefined;
}

export default function ProfileBox(props: ProfileBoxProps) {
  const { userType, userImage, userName, userContact } = props;
  const [logoutState, setLogoutState] = useState(false);
  const { logout } = useLogout(logoutState);

  const userId = useRecoilValue(loginUserId);
  const navigate = useNavigate();
  const prevURL = useLocation().pathname;

  function handleLogout() {
    setLogoutState(!logoutState);
  }

  function handleMoveTo() {
    if (userType === ROLE.PRODUCER) {
      navigate(`/producer-profile/${userId}`, {
        state: {
          prevURL: prevURL,
        },
      });
    } else {
      navigate(`/vocal-profile/${userId}`, {
        state: {
          prevURL: prevURL,
        },
      });
    }
  }

  return (
    <ProfileBoxContainer>
      <ProfileWrapper onClick={handleMoveTo}>
        {userType === ROLE.PRODUCER ? (
          <ProducerImageWrapper>
            <ProducerImageLayout>
              <ProducerProfileImage src={userImage} alt="유저 프로필 이미지" />
            </ProducerImageLayout>
          </ProducerImageWrapper>
        ) : (
          <VocalUploadImageContainer>
            <VocalImageFrame>
              <VocalUploadImageLayout src={userImage} alt="유저 프로필 이미지" />
            </VocalImageFrame>
          </VocalUploadImageContainer>
        )}
        <ProfileContentWrapper>
          <UserNameText>{userName}</UserNameText>
          {userType === ROLE.PRODUCER ? <ProducerTextIcon /> : <VocalTextIcon />}
          <UserEmailText>{userContact}</UserEmailText>
        </ProfileContentWrapper>
      </ProfileWrapper>
      <LogoutWrapper onClick={handleLogout}>
        Logout
        <LogoutIcon />
      </LogoutWrapper>
    </ProfileBoxContainer>
  );
}

const ProfileBoxContainer = styled.div`
  position: absolute;
  z-index: 2;

  top: 12.4rem;
  right: 7rem;

  width: 37.1rem;
  height: 17.1rem;

  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray5};

  cursor: pointer;
`;

const ProducerImageWrapper = styled.div`
  width: 8rem;
  height: 8rem;

  margin-right: 1.8rem;
`;

const ProducerImageLayout = styled.div`
  width: 8rem;
  height: 8rem;

  border-radius: 50%;

  object-fit: cover;
  overflow: hidden;

  margin-right: 1.8rem;
`;

const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const UserNameText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id};
`;

const UserEmailText = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.description};
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 11.4rem;

  padding: 1.5rem 2.2rem;

  /* border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3}; */
`;

const LogoutWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.white};

  width: 100%;
  height: 5.7rem;

  padding: 0.9rem 2rem;
`;

const LogoutIcon = styled(LogoutIc)`
  width: 4rem;
`;

const ProducerTextIcon = styled(ProducerTextIc)`
  width: 7.9rem;

  margin-bottom: 0.9rem;
`;

const VocalTextIcon = styled(VocalTextIc)`
  width: 7.9rem;

  margin-bottom: 0.9rem;
`;

const VocalUploadImageContainer = styled.div`
  display: flex;
  align-items: center;

  width: 8.6rem;
  height: 8.6rem;
`;

const VocalImageFrame = styled.div`
  width: 5.6rem;
  height: 5.6rem;

  margin-left: 0.9rem;

  border-radius: 5rem;
  transform: rotate(45deg);

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 0.5rem;

  overflow: hidden;
  object-fit: cover;

  transform: rotate(-45deg);

  cursor: pointer;
`;

const VocalUploadImageLayout = styled.img`
  width: 8.6rem;
  height: 8.6rem;
  margin-top: -1.5rem;
  margin-left: -1.5rem;

  transform: rotate(45deg);
  object-fit: cover;
`;
