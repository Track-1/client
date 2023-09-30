import styled, { css } from "styled-components";
import { LogoutIc, ProducerTextIc, VocalTextIc } from "../../assets";
import { ROLE } from "../../core/common/roleType";
import { useLogout } from "../../hooks/queries/user";
import { useState } from "react";

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

  function handleLogout() {
    setLogoutState(!logoutState);
  }

  return (
    <ProfileBoxContainer>
      <ProfileWrapper>
        {userType === ROLE.PRODUCER ? (
          <ProducerImageLayout>
            <ProfileImage src={userImage} userType={userType} />
          </ProducerImageLayout>
        ) : (
          <VocalImageLayout>
            <ProfileImage src={userImage} userType={userType} />
          </VocalImageLayout>
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
`;

const VocalImageLayout = styled.div`
  width: 8rem;
  height: 8rem;

  border-radius: 0.5rem;

  overflow: hidden;

  transform: rotate(-45deg);

  object-fit: cover;
  margin-right: 1.8rem;
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

  width: 100%;
  height: 11.4rem;

  padding: 1.5rem 2.2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
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

  cursor: pointer;
`;

const ProducerTextIcon = styled(ProducerTextIc)`
  width: 7.9rem;

  margin-bottom: 0.9rem;
`;

const VocalTextIcon = styled(VocalTextIc)`
  width: 7.9rem;

  margin-bottom: 0.9rem;
`;

const ProfileImage = styled.img<{ userType: string }>`
  width: 100%;
  height: 100%;
  ${(props) =>
    props.userType === ROLE.VOCAL &&
    css`
      transform: rotate(45deg);
    `}
`;
