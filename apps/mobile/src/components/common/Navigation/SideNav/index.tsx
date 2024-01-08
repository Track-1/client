import styled, { css, keyframes } from 'styled-components';
import { ImageWrapper } from '../../Interface';
import { CloseIc, DefaultUserIc, RightArrowIc } from '../../../../assets';
import Text from '../../Text';
import { checkIsLogin, isProducer } from '../../../../utils/common/check';
import { Cover } from 'track-1-design-system';
import { useRecoilValue } from 'recoil';
import { loginUserId, loginUserType } from '../../../../recoil/common/loginUserData';
import { useGetProducerProfile, useGetVocalProfile } from '../../../../hooks/queries/mypage';
import { Link } from 'react-router-dom';
import { Z_INDEX } from '../../../../core/common/zIndex';
import { useLogout } from '../../../../hooks/queries/user';
import { useState } from 'react';
import { theme } from '../../../../style/theme';
import { useMovePage } from '../../../../hooks/common/useMovePage';

function UserInfo() {
  const isLoggedIn = checkIsLogin();
  const userId = useRecoilValue(loginUserId);
  const userType = useRecoilValue(loginUserType);
  const userProfile = isProducer(userType)
    ? useGetProducerProfile(userId).producerProfile?.userProfile
    : useGetVocalProfile(userId).vocalProfile?.userProfile;

  const [logoutState, setLogoutState] = useState(false);

  const { logout } = useLogout(logoutState);

  const { handleMovePage } = useMovePage();

  function handleLogout() {
    setLogoutState(!logoutState);
  }

  return (
    <UserInfoContainer>
      <ImageWrapper width={4} height={4}>
        {isLoggedIn ? (
          <Link to={isProducer(userType) ? `/producer-profile/${userId}` : `/vocal-profile/${userId}`}>
            <Cover imageUrl={userProfile?.userImageFile || ''} width={4} height={4} shape="circle" />
          </Link>
        ) : (
          <DefaultUserIc />
        )}
      </ImageWrapper>

      <UserInfoWrapper isLoggedIn={isLoggedIn}>
        {isLoggedIn ? (
          <>
            <UserProfileWrapper
              onClick={() => handleMovePage(isProducer(userType) ? 'producer-profile' : 'vocal-profile', userId)}>
              <UserNameWrapper>
                <Text as="p" color="white" font="Pre_18_M">
                  {userProfile?.userName}
                </Text>
                <ImageWrapper width={0.7} height={1.1}>
                  <RightArrowIc />
                </ImageWrapper>
              </UserNameWrapper>
              <Text as="p" color={isProducer(userType) ? 'neon_green' : 'neon_pink'} font="Pre_14_R">
                {userType}
              </Text>
            </UserProfileWrapper>

            <Text as="p" color="gray2" font="Pre_14_R">
              <div onClick={handleLogout}>Log out</div>
            </Text>
          </>
        ) : (
          <>
            <Text as="span" font="Pre_18_R" color="gray2">
              {`Have an account? `}
              &nbsp;
            </Text>
            <Text as="span" font="Pre_18_R" color="white">
              <Link to="/login"> {`Log in here`}</Link>
            </Text>
          </>
        )}
      </UserInfoWrapper>
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;

  width: 100%;
  padding: 0.8rem 0;
`;

const UserInfoWrapper = styled.div<{ isLoggedIn: boolean }>`
  display: flex;
  justify-content: ${(props) => props.isLoggedIn && 'space-between'};
  align-items: center;

  width: 100%;

  ${(props) =>
    props.isLoggedIn
      ? css`
          justify-content: space-between;
          margin-left: 1.3rem;
        `
      : css`
          margin-left: 1rem;
        `}
`;

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  height: 100%;
`;

interface SideNavProps {
  openModal: boolean;
  unShowModal: () => void;
}

export default function SideNav(props: SideNavProps) {
  const { openModal, unShowModal } = props;
  return (
    <Container openModal={openModal}>
      <NavTopItemWrapper>
        <ImageWrapper as="button" width={1.4} height={1.4}>
          <CloseIc onClick={unShowModal} stroke={theme.colors.white} />
        </ImageWrapper>
      </NavTopItemWrapper>

      <UserInfo />

      <NavItemWrapper>
        <Text as="li" font="Pre_40_R" color="white">
          <Link to="/about">About</Link>
        </Text>
        <Text as="li" font="Pre_40_R" color="white">
          <Link to="/event">Events</Link>
        </Text>
        <Text as="li" font="Pre_40_R" color="white">
          <Link to="/track-search">Tracks</Link>
        </Text>
        <Text as="li" font="Pre_40_R" color="white">
          <Link to="/vocal-search">Vocals</Link>
        </Text>
      </NavItemWrapper>
    </Container>
  );
}

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Container = styled.nav<{ openModal: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ openModal }) => (openModal ? '0' : '-100%')};
  animation: ${({ openModal }) => (openModal ? slideIn : slideOut)} 0.5s ease-in-out;
  z-index: ${Z_INDEX.SIDE_NAV};

  width: 100%;
  height: 100%;

  padding: 0 2.5rem;

  background-color: ${({ theme }) => theme.colors.gray6};
`;

const NavTopItemWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  width: 100%;

  padding: 2rem 0;
`;

const NavItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4.1rem;

  margin-top: 9.1rem;
`;
