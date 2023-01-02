import styled, { keyframes } from "styled-components";
import bannerImg from "../../assets/image/bannerImg.png";

export default function Footer() {
  return (
    <FooterContainer>
      <Banner />
      <Copyright>
        <CopyrightText className="text">Conditions of Use Privacy Notice Your Ads Privacy Choices</CopyrightText>
        <CopyrightText className="text">ⓒ 2022 Trackone.com, Inc. or its affiliates</CopyrightText>
      </Copyright>
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

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.2rem;
  /*  */
`;

const CopyrightText = styled.p`
  margin-bottom: 1rem;
`;
