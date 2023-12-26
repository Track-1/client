import styled from 'styled-components';
import { Track1LogoIc } from '../../assets';
import LoginInput from './loginInput';
import { useMovePage } from '../../hooks/common/useMovePage';

export default function LoginContainer() {
  const { handleMovePage } = useMovePage();

  return (
    <Container>
      <LogoWrapper>
        <Track1LogoIcon />
        {/* 텍스트 들어가야됨 */}
      </LogoWrapper>

      <LoginInput />
      <SignupTextWrapper>
        <span>If you are a new user,</span>
        <span
          onClick={() => {
            handleMovePage('signup');
          }}>
          Sign up here
        </span>
      </SignupTextWrapper>
    </Container>
  );
}

const LogoWrapper = styled.div`
  width: 100%;

  text-align: center;

  margin: 6.3rem 0 4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 0 2.5rem;
`;

const Track1LogoIcon = styled(Track1LogoIc)`
  width: 18.4rem;
  margin-bottom: 1rem;
`;

const SignupTextWrapper = styled.div`
  text-align: center;
  background-color: white;
`;
