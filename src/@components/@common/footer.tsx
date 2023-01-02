import styled, { keyframes } from "styled-components";
import bannerImg from "../../assets/image/bannerImg.png";

export default function Footer() {
  return (
    <FooterContainer>
      <Banner />
      <FooterTextWrap>
        <FooterText>Conditions of Use Privacy Notice Your Ads Privacy Choices</FooterText>
        <FooterText>ⓒ 2022 Trackone.com, Inc. or its affiliates</FooterText>
      </FooterTextWrap>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 23rem;
`;

const LinearFlow = keyframes`
  0% {background-position : 0rem;}
  100% { background-position : -192rem};

`;

const Banner = styled.div`
  height: 6.2rem;

  margin-top: 3.1rem;
  background: url(${bannerImg}) 0 center/192rem repeat-x;
  -webkit-animation: ${LinearFlow} 15s infinite linear;
  -moz-animation: ${LinearFlow} 15s infinite linear;
  -o-animation: ${LinearFlow} 15s infinite linear;
`;

const FooterTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
`;
