import styled from 'styled-components';
import { WelcomeProfileIc } from '../../../assets';

export default function Header() {
  return <Styled.WelcomeProfileIcon />;
}

const Styled = {
  WelcomeProfileIcon: styled(WelcomeProfileIc)`
    width: 39rem;
    height: 38rem;

    position: absolute;
    z-index: -1;
  `,
};
