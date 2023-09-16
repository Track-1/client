import styled from "styled-components";
import KoreaVersion from "./koreaVersion";
import MobileHeader from "./mobileHeader";

export default function MobileLanding() {
  return (
    <MobileLandingContainer>
      <MobileLandingSection>
        <MobileHeader />
        <KoreaVersion />
      </MobileLandingSection>
    </MobileLandingContainer>
  );
}

const MobileLandingContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  overflow: scroll;
`;

const MobileLandingSection = styled.section`
  width: 39.3rem;

  border: 1px solid white;
`;
