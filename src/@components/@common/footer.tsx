import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import banner from "../../assets/image/banner.svg";

export default function Footer() {
  const [pixel, setPixel] = useState<number>(0);
  const interval: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setPixel((prev) => prev + 1);
    }, 50);
    return () => clearInterval(interval.current as NodeJS.Timeout);
  });
  return (
    <>
      <FooterContainer>
        <Banner src={banner} alt="배너 이미지" />
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
  height: 230px;

  background-color: black;
`;

const Banner = styled.img`
  margin-top: 31px;
  background-repeat: repeat-x;
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 42px;
  color: #ffffff;
`;
