import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { FacebookLogoIc, InstagramLogoIc } from "../../assets";
import bannerImg from "../../assets/image/bannerImg.png";
import { CONVENTION_TYPE } from "../../core/common/convention/conventionType";
import { openConventionModal } from "../../recoil/common/conventionModal";

export default function Footer() {
  const [conventionModalInform, setConventionModalInform] = useRecoilState(openConventionModal);

  function openModal(policyCategory: string) {
    setConventionModalInform({ policy: policyCategory, isOpen: true });
  }

  return (
    <FooterContainer>
      {/* <Banner /> */}
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

const LinearFlow = keyframes`
  0% {background-position : 0rem;}
  100% { background-position : -192rem};

`;

const Banner = styled.div`
  height: 6.2rem;
  background-color: black;
  margin-bottom: 5.6rem;

  /* margin-top: 3.1rem; */
  background: url(${bannerImg}) 0 center/192rem repeat-x;
  -webkit-animation: ${LinearFlow} 15s infinite linear;
  -moz-animation: ${LinearFlow} 15s infinite linear;
  -o-animation: ${LinearFlow} 15s infinite linear;
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
