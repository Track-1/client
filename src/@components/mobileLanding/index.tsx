import styled from "styled-components";
import MobileHeader from "./mobileHeader";

export default function MobileLanding() {
  return (
    <MobileLandingContainer>
      <MobileLandingSection>
        <MobileHeader />
      </MobileLandingSection>
    </MobileLandingContainer>
  );
}

const MobileLandingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const MobileLandingSection = styled.section`
  width: 39.3rem;
  height: 30.55rem;
`;
