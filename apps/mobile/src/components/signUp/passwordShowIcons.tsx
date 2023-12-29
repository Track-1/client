import styled from 'styled-components';
import { ShowPasswordSignupIc, UnshowPasswordSignupIc } from '../../assets';

interface PasswordShowIconsProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordShowIcons(props: PasswordShowIconsProps) {
  const { isShow, setIsShow } = props;

  function handleShowPassword() {
    setIsShow(!isShow);
  }

  return (
    <EyeWrapper onClick={handleShowPassword}>
      {isShow ? <UnshowPasswordSignupIcon /> : <ShowPasswordSignupIcon />}
    </EyeWrapper>
  );
}

const EyeWrapper = styled.i`
  margin: -7.5rem 0 0 52rem;
  position: absolute;

  cursor: pointer;
`;

const ShowPasswordSignupIcon = styled(ShowPasswordSignupIc)`
  width: 4rem;
  height: 4rem;
`;

const UnshowPasswordSignupIcon = styled(UnshowPasswordSignupIc)`
  width: 4rem;
  height: 4rem;
`;
