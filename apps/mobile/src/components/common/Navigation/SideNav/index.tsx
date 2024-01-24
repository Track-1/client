import styled, { css, keyframes } from 'styled-components';
import { ImageWrapper } from '../../Interface';
import { CloseIc, DefaultUserIc, RightArrowIc } from '../../../../assets';
import Text from '../../Text';
import { isProducer } from '../../../../utils/common/check';
import { Cover } from 'track-1-design-system';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { loginUserData } from '../../../../recoil/common/loginUserData';
import { Link, useLocation } from 'react-router-dom';
import { Z_INDEX } from '../../../../core/common/zIndex';
import { theme } from '../../../../style/theme';
import { useMovePage } from '../../../../hooks/common/useMovePage';
import * as Dialog from '@radix-ui/react-dialog';
import { Background } from '../../Modal/bottomUpModal';
import { removeCookie } from '../../../../utils/common/cookie';
import { getLogout } from '../../../../api/user';

interface UserInfoProps {
  unShowModal: () => void;
}

function UserInfo(props: UserInfoProps) {
  const { unShowModal } = props;
  const { userId, userType, userImageFile, userName } = useRecoilValue(loginUserData);
  const resetLoginUserData = useResetRecoilState(loginUserData);

  const { handleMovePage } = useMovePage();

  async function handleLogout() {
    const isLoggedOut = await getLogout();

    if (isLoggedOut) {
      unShowModal();
      resetLoginUserData();
      removeCookie('accessToken', {
        path: '',
        domain: 'http://localhost:3000' || 'https://www.track1.site' || 'https://www.m.track1.site',
      });
    }
  }

  return (
    <UserInfoContainer>
      <ImageWrapper width={4} height={4}>
        {userId > 0 ? (
          <Link to={isProducer(userType) ? `/producer-profile/${userId}` : `/vocal-profile/${userId}`}>
            <Cover imageUrl={userImageFile} width={4} height={4} shape="circle" />
          </Link>
        ) : (
          <DefaultUserIc width={40} height={40} />
        )}
      </ImageWrapper>

      <UserInfoWrapper isLoggedIn={userId > 0}>
        {userId > 0 ? (
          <>
            <UserProfileWrapper
              onClick={() => handleMovePage(isProducer(userType) ? 'producer-profile' : 'vocal-profile', userId)}>
              <UserNameWrapper>
                <Text as="p" color="white" font="Pre_18_M">
                  {userName}
                </Text>
                <ImageWrapper width={0.7} height={1.1}>
                  <RightArrowIc width={7} height={11} />
                </ImageWrapper>
              </UserNameWrapper>
              <Text as="p" color={isProducer(userType) ? 'neon_green' : 'neon_pink'} font="Pre_14_R">
                {userType}
              </Text>
            </UserProfileWrapper>

            <Text as="span" color="gray2" font="Pre_14_R">
              <div onClick={handleLogout}>Log out</div>
            </Text>
          </>
        ) : (
          <UserProfileWrapper>
            <Text as="p" font="Pre_18_R" color="gray2">
              {`Have an account? `}
            </Text>
            <Text as="p" font="Pre_18_R" color="white">
              <a
                onClick={() => {
                  handleMovePage('login', undefined, location.pathname);
                }}>
                {'Log in here'}
              </a>
            </Text>
          </UserProfileWrapper>
        )}
      </UserInfoWrapper>
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;

  width: 100%;
  height: 6rem;
  padding: 1rem 0;
`;

const UserInfoWrapper = styled.div<{ isLoggedIn: boolean }>`
  display: flex;
  justify-content: ${(props) => props.isLoggedIn && 'space-between'};
  align-items: center;

  width: 100%;
  height: 100%;

  margin-left: 1rem;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 0.5rem;

  width: calc(100% - 5rem);
  height: 100%;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface SideNavProps {
  openModal: boolean;
  unShowModal: () => void;
}

export default function SideNav(props: SideNavProps) {
  const { openModal, unShowModal } = props;
  const { handleMovePage } = useMovePage();
  const location = useLocation();

  return (
    <>
      <Dialog.Root open={openModal} onOpenChange={unShowModal}>
        <Dialog.Portal>
          <Background>
            <Dialog.Content>
              <Container openModal={openModal}>
                <NavTopItemWrapper>
                  <ImageWrapper as="button" width={1.4} height={1.4}>
                    <CloseIc width={14} height={14} onClick={unShowModal} stroke={theme.colors.white} />
                  </ImageWrapper>
                </NavTopItemWrapper>

                <UserInfo unShowModal={unShowModal} />

                <NavItemWrapper>
                  <Text as="li" font="Pre_40_R" color="white">
                    <a
                      onClick={() => {
                        if (location.pathname.includes('signup')) {
                          if (window.confirm('회원가입을 종료하시겠습니까?')) {
                            handleMovePage('about');
                            unShowModal();
                          }
                        } else {
                          handleMovePage('about');
                          unShowModal();
                        }
                      }}>
                      About
                    </a>
                  </Text>
                  <Text as="li" font="Pre_40_R" color="white">
                    <a
                      onClick={() => {
                        if (location.pathname.includes('signup')) {
                          if (window.confirm('회원가입을 종료하시겠습니까?')) {
                            handleMovePage('event');
                            unShowModal();
                          }
                        } else {
                          handleMovePage('event');
                          unShowModal();
                        }
                      }}>
                      Events
                    </a>
                  </Text>
                  <Text as="li" font="Pre_40_R" color="white">
                    <a
                      onClick={() => {
                        if (location.pathname.includes('signup')) {
                          if (window.confirm('회원가입을 종료하시겠습니까?')) {
                            handleMovePage('track-search');
                            unShowModal();
                          }
                        } else {
                          handleMovePage('track-search');
                          unShowModal();
                        }
                      }}>
                      Tracks
                    </a>
                  </Text>
                  <Text as="li" font="Pre_40_R" color="white">
                    <a
                      onClick={() => {
                        if (location.pathname.includes('signup')) {
                          if (window.confirm('회원가입을 종료하시겠습니까?')) {
                            handleMovePage('vocal-search');
                            unShowModal();
                          }
                        } else {
                          handleMovePage('vocal-search');
                          unShowModal();
                        }
                      }}>
                      Vocals
                    </a>
                  </Text>
                </NavItemWrapper>
              </Container>
            </Dialog.Content>
          </Background>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
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
  right: ${({ openModal }) => (openModal ? '0' : '-100%')};
  animation: ${({ openModal }) => (openModal ? slideIn : slideOut)} 0.5s ease-in-out;
  z-index: ${Z_INDEX.SIDE_NAV};

  width: 29.7rem;
  height: 100%;

  padding: 0 2.5rem;

  border-radius: 10px 0px 0px 10px;
  border-top: 1px solid #2f2f2f;
  border-bottom: 1px solid #2f2f2f;
  border-left: 1px solid #2f2f2f;
  background: rgba(20, 21, 23, 0.7);
  backdrop-filter: blur(15px);

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
