import styled from "styled-components";
import Header from "../@common/header";
import mainSectionBackgroundImg from "../../assets/image/mainSectionBackgroundImg.png";
import laptopImg from "../../assets/image/laptopImg.png";
import aboutBackgroundImg from "../../assets/image/aboutBackgroundImg.png";
import Footer from "../@common/footer";
import { useRef } from "react";
import AboutUs from "./aboutUs";
import HowToUse from "./howToUse";
import AboutMain from "./aboutMain";

export default function About() {
  const aboutSectionRef = useRef<HTMLTableSectionElement>(null);
  const howToSectionRef = useRef<HTMLTableSectionElement>(null);

  function handleMoveAboutSection() {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleMoveHowToSection() {
    howToSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Hedaer */}

      <Styled.Container>
        {/* Main */}
        <AboutMain handleMoveAboutSection={handleMoveAboutSection} handleMoveHowToSection={handleMoveHowToSection} />
        {/* About us */}
        <AboutUs scrollRef={aboutSectionRef} />
        {/* How to use */}
        <HowToUse scrollRef={howToSectionRef} />
      </Styled.Container>
      <Footer />
    </>
  );
}

const Styled = {
  Container: styled.main`
    width: 100%;
    height: 100%;
  `,
};
