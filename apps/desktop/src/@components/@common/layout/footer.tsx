import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { FacebookLogoIc, InstagramLogoIc } from '../../../assets';
import { CONVENTION_TYPE } from '../../../core/common/convention/conventionType';
import { openConventionModal } from '../../../recoil/common/conventionModal';

export default function Footer() {
  const [, setConventionModalInform] = useRecoilState(openConventionModal);

  function openModal(policyCategory: string) {
    setConventionModalInform({ policy: policyCategory, isOpen: true });
  }

  return (
    <FooterContainer>
      <FooterTextWrapper>
        <Text isGray={false} isStrong={true} marginRight={2.4} onClick={() => openModal(CONVENTION_TYPE.PERSONAL)}>
          개인정보처리방침
        </Text>
        <Text isGray={false} isStrong={false} marginRight={0} onClick={() => openModal(CONVENTION_TYPE.USINGSITE)}>
          서비스 이용약관
        </Text>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <Text isGray={true} isStrong={false} marginRight={2.4}>
          Email
        </Text>
        <Text isGray={true} isStrong={false} marginRight={0}>
          admin@track-1.link
        </Text>
      </FooterTextWrapper>
      <LogoWrapper>
        <a href="https://www.instagram.com/track1.official/">
          <InstagramLogoIcon />
        </a>
        <a href="https://www.facebook.com/people/Track-1/100088269640316/">
          <FacebookLogoIcon />
        </a>
      </LogoWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 29rem;

  background-color: black;
`;

const FooterTextWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 2rem 0 0 92rem;

  width: 7.8rem;
`;

const Text = styled.p<{ isGray: boolean; isStrong: boolean; marginRight: number }>`
  margin-right: ${({ marginRight }) => marginRight}rem;

  color: ${({ theme, isGray }) => (isGray ? theme.colors.gray3 : theme.colors.white)};
  ${({ theme }) => theme.fonts.message};
  font-weight: ${({ isStrong }) => (isStrong ? 700 : 400)};

  cursor: pointer;
`;

const InstagramLogoIcon = styled(InstagramLogoIc)`
  width: 2.8rem;
  height: 2.8rem;
`;

const FacebookLogoIcon = styled(FacebookLogoIc)`
  width: 2.8rem;
  height: 2.8rem;
`;
