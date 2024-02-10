import styled, { CSSProperties } from 'styled-components';
import SamllButton from '../@common/button/customButton';
import { theme } from '../../style/theme';
import { useContext, useEffect } from 'react';
import { PlayerContext } from '../../context/playerContext';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';
import { ROLE } from '../../core/common/roleType';
import useModal from '../../hooks/common/useModal';
import ProfileBox from './profileBox';

export default function LoginBtn() {
  const { quitAudioForMovePage } = useContext(PlayerContext);

  const userData = useRecoilValue(loginUserData);

  const { openModal, unShowModal, handleShowUpdateModal } = useModal();

  const navigate = useNavigate();

  useEffect(() => {
    unShowModal();
  }, []);

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

  return (
    <Styled.LoginBtnWrapper>
      {userData.userId > 0 ? (
        <Styled.LoginedInfoWrapper userType={userData.userType} onClick={handleShowUpdateModal}>
          <Styled.LoginedUserImage src={userData.userImageFile} userType={userData.userType} />
          {userData.userName}
          {openModal && <ProfileBox />}
        </Styled.LoginedInfoWrapper>
      ) : (
        <>
          <SamllButton btnStyle={LoginBtnStyle} handleClickFunction={handleMoveToLogin}>
            Login
          </SamllButton>
          <SamllButton btnStyle={SignupBtnStyle} handleClickFunction={handleMoveToSignup}>
            Sign up
          </SamllButton>
        </>
      )}
    </Styled.LoginBtnWrapper>
  );
}

const Styled = {
  LoginBtnWrapper: styled.div`
    display: flex;

    cursor: pointer;
  `,

  LoginedInfoWrapper: styled.div<{ userType: string }>`
    display: flex;
    align-items: center;
    min-width: 19.5rem;

    width: 100%;
    height: 100%;

    color: ${(props) => (props.userType === ROLE.PRODUCER ? theme.colors.sub1 : theme.colors.sub2)};
    ${({ theme }) => theme.fonts.pretendard_text22};
  `,

  LoginedUserImage: styled.img<{ userType: string }>`
    width: 5rem;
    height: 5rem;

    margin-right: 1rem;

    border-radius: 50%;

    border: 0.2rem solid;
    border-color: ${(props) => (props.userType === ROLE.PRODUCER ? theme.colors.sub1 : theme.colors.sub3)};
  `,
};

const LoginBtnStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '2.2rem',
  lineHeight: 'normal',

  width: '17.6rem',
  height: '4.9rem',

  color: `${theme.colors.white}`,
  background: `${theme.colors.black}`,

  border: `0.1rem solid ${theme.colors.white}`,
  borderRadius: '3rem',
};

const SignupBtnStyle: CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '2.2rem',
  lineHeight: 'normal',

  width: '17.6rem',
  height: '4.9rem',

  color: `${theme.colors.black}`,

  background: `${theme.colors.white}`,
  borderRadius: '3rem',

  marginLeft: '2rem',
};
