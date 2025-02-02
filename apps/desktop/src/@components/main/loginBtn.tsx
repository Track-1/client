import styled from 'styled-components';
import useModal from '../../hooks/common/useModal';
import ProfileBox from './profileBox';
import { theme } from '../../style/theme';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';
import { ROLE } from '../../core/common/roleType';
import { PlayUseContext } from '../../context/playerContext';

export default function LoginBtn() {
  const { quitAudioForMovePage } = PlayUseContext({});
  const userData = useRecoilValue(loginUserData);
  const { openModal, unShowModal, handleShowUpdateModal } = useModal();
  const navigate = useNavigate();

  function handleMoveToLogin() {
    quitAudioForMovePage();
    navigate('/login', {
      state: {
        prevURL: '/',
      },
    });
  }

  function handleMoveToSignup() {
    quitAudioForMovePage();
    navigate('/signup');
  }

  useEffect(() => {
    unShowModal();
  }, []);

  return (
    <LoginBtnWrapper>
      {userData.userId !== -1 ? (
        <LoginedInfoWrapper userType={userData.userType} onClick={handleShowUpdateModal}>
          <LoginedUserImage src={userData.userImageFile} userType={userData.userType} />
          {userData.userName}
          {openModal && <ProfileBox />}
        </LoginedInfoWrapper>
      ) : (
        <>
          {/* <LoginButton onClick={handleMoveToLogin}>Login</LoginButton>
          <SignupButton onClick={handleMoveToSignup}>Sign up</SignupButton> */}
        </>
      )}
    </LoginBtnWrapper>
  );
}

const LoginButton = styled.button`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 2.2rem;
  line-height: normal;

  width: 17.6rem;
  height: 4.9rem;

  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.black};

  border: 0.1rem solid ${({ theme }) => theme.colors.white};
  border-radius: 3rem;
`;

const SignupButton = styled.button`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 2.2rem;
  line-height: normal;

  width: 17.6rem;
  height: 4.9rem;

  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};

  border: 0.1rem solid ${({ theme }) => theme.colors.white};
  border-radius: 3rem;

  margin-left: 1.2rem;
`;

const LoginBtnWrapper = styled.div`
  display: flex;

  cursor: pointer;
`;

const LoginedInfoWrapper = styled.div<{ userType: string }>`
  display: flex;
  align-items: center;
  min-width: 19.5rem;

  width: 100%;
  height: 100%;

  color: ${(props) => (props.userType === ROLE.PRODUCER ? theme.colors.sub1 : theme.colors.sub2)};
  ${({ theme }) => theme.fonts.pretendard_text22};
`;

const LoginedUserImage = styled.img<{ userType: string }>`
  width: 5rem;
  height: 5rem;

  margin-right: 1rem;

  border-radius: 50%;

  border: 0.2rem solid;
  border-color: ${(props) => (props.userType === ROLE.PRODUCER ? theme.colors.sub1 : theme.colors.sub3)};
`;
