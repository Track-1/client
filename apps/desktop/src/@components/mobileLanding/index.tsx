import { useState } from "react";
import styled from "styled-components";
import EngLinkBox from "./engLinkBox";
import EnglishVersion from "./englishVersion";
import KorLinkBox from "./korLinkBox";
import KoreaVersion from "./koreaVersion";
import MobileHeader from "./mobileHeader";

export default function MobileLanding() {
  const [language, setLanguage] = useState("Kor");

  return (
    <MobileLandingContainer>
      <MobileLandingSection>
        <MobileHeader language={language} setLanguage={setLanguage} />
        {language === "Kor" ? <KoreaVersion /> : <EnglishVersion />}
        {language === "Kor" ? <KorLinkBox /> : <EngLinkBox />}
      </MobileLandingSection>
    </MobileLandingContainer>
  );
}

const MobileLandingContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  /* overflow: scroll; */
  scroll-behavior: smooth;
`;

const MobileLandingSection = styled.section`
  width: 39.3rem;

  /* border: 1px solid white; */
`;
