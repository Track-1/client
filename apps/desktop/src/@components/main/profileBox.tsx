import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { ROLE } from '../../core/common/roleType';
import { loginUserData } from '../../recoil/common/loginUserData';
import { getLogout } from '../../api/user';
import { removeCookie } from '../../utils/common/cookie';

export default function ProfileBox() {
  const prevURL = useLocation().pathname;
  const userData = useRecoilValue(loginUserData);
  const navigate = useNavigate();
  const resetLoginUserData = useResetRecoilState(loginUserData);

  async function handleLogout() {
    const data = await getLogout();

    if (data) {
      resetLoginUserData();
      removeCookie('accessToken', { path: '/' });
    }
  }

  function handleMoveTo() {
    if (userData.userType === ROLE.PRODUCER) {
      navigate(`/producer-profile/${userData.userId}`, {
        state: {
          prevURL: prevURL,
        },
      });
    } else {
      navigate(`/vocal-profile/${userData.userId}`, {
        state: {
          prevURL: prevURL,
        },
      });
    }
  }

  return (
    <ProfileBoxContainer>
      <ProfileInfoWrapper onClick={handleMoveTo}>
        <ProfileContentWrapper>
          <UserNameText>{userData.userName}</UserNameText>
          <UserEmailText>{userData.userContact}</UserEmailText>
        </ProfileContentWrapper>
        <ProfileUserTypeWrapper>
          <UserTypeText userType={userData.userType}>{userData.userType}</UserTypeText>
        </ProfileUserTypeWrapper>
      </ProfileInfoWrapper>
      <LogoutWrapper onClick={handleLogout}>
        <LogoutText>Logout</LogoutText>
      </LogoutWrapper>
    </ProfileBoxContainer>
  );
}

const ProfileBoxContainer = styled.div`
  position: absolute;

  top: 12.4rem;
  right: 7rem;

  width: 37.1rem;
  height: 16.5rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.gray5};

  cursor: pointer;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 10.6rem;

  padding: 2.5rem 2.5rem 2rem 2.5rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
`;

const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 25rem;
`;

const ProfileUserTypeWrapper = styled.div`
  width: calc(100% - 25rem);
`;

const UserNameText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id};
`;

const UserEmailText = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.description};
`;

const UserTypeText = styled.p<{ userType: string }>`
  color: ${(props) =>
    props.userType === ROLE.PRODUCER ? ({ theme }) => theme.colors.sub1 : ({ theme }) => theme.colors.sub2};
  ${({ theme }) => theme.fonts.description};
`;

const LogoutWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5.7rem;

  padding: 0.9rem 2rem;
`;

const LogoutText = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.description};

  text-decoration: underline;

  cursor: pointer;
`;
