import styled, { keyframes } from "styled-components";
import bannerImg from "../../assets/image/bannerImg.png";

export default function Footer() {
  return (
    <FooterContainer>
      <Banner />
      <FooterTextWrap>
        <p>개인정보처리방침</p>
        <p>서비스 이용약관</p>
        <p>Email</p>
        <p>track-1@track-1.link</p>
        
      </FooterTextWrap>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 23rem;

  background-color: black;
`;

const LinearFlow = keyframes`
  0% {background-position : 0rem;}
  100% { background-position : -192rem};

`;

const Banner = styled.div`
  height: 6.2rem;
  background-color: black;

  /* margin-top: 3.1rem; */
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

