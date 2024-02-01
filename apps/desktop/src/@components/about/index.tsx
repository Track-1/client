import styled from 'styled-components';
import Footer from '../@common/footer';
import { useEffect, useRef } from 'react';
import AboutUs from './aboutUs';
import HowToUse from './howToUse';
import AboutMain from './aboutMain';
import MainHeader from '../main/mainHeader';

export default function About() {
  const aboutSectionRef = useRef<HTMLTableSectionElement>(null);
  const howToSectionRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleMoveAboutSection() {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleMoveHowToSection() {
    howToSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <MainHeader />
      {/* Main */}
      <AboutMain handleMoveAboutSection={handleMoveAboutSection} handleMoveHowToSection={handleMoveHowToSection} />
      {/* About us */}
      <AboutUs scrollRef={aboutSectionRef} />
      {/* How to use */}
      <HowToUse scrollRef={howToSectionRef} />

      <Footer />
    </>
  );
}
