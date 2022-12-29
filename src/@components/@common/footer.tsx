import styled, { keyframes } from "styled-components";
import banner from "../../assets/image/banner.svg";

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <Banner title="배너이미지" />
        <Copyright>
          <p className="text">Conditions of Use Privacy Notice Your Ads Privacy Choices</p>
          <p className="text">ⓒ 2022 Trackone.com, Inc. or its affiliates</p>
        </Copyright>
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 14.375rem;

  background-color: black;
`;

const LinearFlow = keyframes`
  from {background-position : 0rem;}
  to { background-position : -120rem;}

`;

const Banner = styled.div`
  width: 100%;
  height: 3.8125rem;

  margin-top: 1.9375rem;
  background-image: url(${banner});
  background-repeat: no-repeat;
  background-repeat: repeat-x;
  -webkit-animation: ${LinearFlow} 15s infinite linear;
  -moz-animation: ${LinearFlow} 15s infinite linear;
  -o-animation: ${LinearFlow} 15s infinite linear;
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.625rem;
  color: #ffffff;
`;
