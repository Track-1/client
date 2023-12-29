import styled from 'styled-components';
import { Track1LogoIc } from '../../assets';
import LoginInput from './loginInput';
import { useMovePage } from '../../hooks/common/useMovePage';
import Text from '../common/Text';

export default function LoginContainer() {
  const { handleMovePage } = useMovePage();

  return (
    <Container>
      <LogoWrapper>
        <Track1LogoIcon />
        <Text as="p" font="Pre_14_R" color="gray4">
          Discover your Limitless Track
        </Text>
      </LogoWrapper>

      <LoginInput />

      <SignupTextWrapper>
        <Text as="span" font="Pre_14_M" color="gray2">
          If you are a new user,
        </Text>

        <Text as="span" font="Pre_14_M" color="neon_purple">
          <a
            onClick={() => {
              handleMovePage('signup');
            }}>
            Sign up here
          </a>
        </Text>
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
`;

const Track1LogoIcon = styled(Track1LogoIc)`
  width: 18.4rem;
  margin-bottom: 1rem;
`;

const SignupTextWrapper = styled.div`
  text-align: center;
`;
