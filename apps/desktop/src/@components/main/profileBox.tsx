import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ROLE } from '../../core/common/roleType';

import { loginUserData } from '../../recoil/common/loginUserData';
import { getLogout } from '../../api/user';
import { removeCookie } from '../../utils/common/cookie';

export default function ProfileBox() {
  const navigate = useNavigate();
  const prevURL = useLocation().pathname;

  const userData = useRecoilValue(loginUserData);
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
    <Styled.ProfileBoxContainer>
      <Styled.ProfileInfoWrapper onClick={handleMoveTo}>
        <Styled.ProfileContentWrapper>
          <Styled.UserNameText>{userData.userName}</Styled.UserNameText>
          <Styled.UserEmailText>{userData.userContact}</Styled.UserEmailText>
        </Styled.ProfileContentWrapper>
        <Styled.ProfileUserTypeWrapper>
          <Styled.UserTypeText userType={userData.userType}>{userData.userType}</Styled.UserTypeText>
        </Styled.ProfileUserTypeWrapper>
      </Styled.ProfileInfoWrapper>
      <Styled.LogoutWrapper onClick={handleLogout}>
        <Styled.LogoutText>Logout</Styled.LogoutText>
      </Styled.LogoutWrapper>
    </Styled.ProfileBoxContainer>
  );
}

const Styled = {
  ProfileBoxContainer: styled.div`
    position: absolute;

    top: 12.4rem;
    right: 7rem;

    width: 37.1rem;
    height: 16.5rem;

    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.gray5};

    cursor: pointer;
  `,

  ProfileInfoWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 10.6rem;

    padding: 2.5rem 2.5rem 2rem 2.5rem;

    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
  `,

  ProfileContentWrapper: styled.div`
    display: flex;
    flex-direction: column;

    width: 25rem;
  `,

  ProfileUserTypeWrapper: styled.div`
    width: calc(100% - 25rem);
  `,

  UserNameText: styled.p`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.id};
  `,

  UserEmailText: styled.p`
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.description};
  `,

  UserTypeText: styled.p<{ userType: string }>`
    color: ${(props) =>
      props.userType === ROLE.PRODUCER ? ({ theme }) => theme.colors.sub1 : ({ theme }) => theme.colors.sub2};
    ${({ theme }) => theme.fonts.description};
  `,

  LogoutWrapper: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 5.7rem;

    padding: 0.9rem 2rem;
  `,

  LogoutText: styled.p`
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.description};

    text-decoration: underline;

    cursor: pointer;
  `,
};
