import React from "react";
import background from "../../assets/image/backgroundImg.png";
import { useNavigate } from "react-router-dom";
import ConventionModal from "../@common/conventionModal";
import styled from "styled-components";
import { ErrorPageMainIc, ErrorPageTextIc, TrackOneMainLogoIc } from "../../assets";
import useModal from "../../hooks/common/useModal";

export default function ErrorPageContainer() {
  const { openModal } = useModal();
  const navigate = useNavigate();

  function moveToMain() {
    navigate("/");
  }

  async function copyLink(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copy link completed.\n링크가 복사되었습니다. ");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Container>
        <Img src={background} alt="배경" />
        <Header>
          <TrackOneMainLogoIcon onClick={moveToMain} />
        </Header>
        <ErrorPageWrapper>
          <ErrorPageMainIcon />
          <ErrorPageTextIcon />
          <DescriptionWrapper>
            <p>Something went wrong</p>
            <p>Please Refresh Your Browser</p>
          </DescriptionWrapper>
          <ContactTextWrapper>
            <p>Or Please contact us </p>
            <EmailLink onClick={() => copyLink("admin@track-1.link")}>admin@track-1.link </EmailLink>
          </ContactTextWrapper>
        </ErrorPageWrapper>
      </Container>

      {openModal && <ConventionModal />}
    </>
  );
}

const Container = styled.main`
  position: absolute;

  width: 100%;
  height: 100%;
`;

const ErrorPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 72.7rem;
  height: 66.2rem;

  margin: 6.6rem 0 20.9rem 59.7rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Img = styled.img`
  position: absolute;
  width: 192rem;
  height: 90rem;

  bottom: 0;
`;

const ErrorPageMainIcon = styled(ErrorPageMainIc)`
  width: 21.8rem;
  height: 21.8rem;

  margin: 9rem 0 5rem 0;
`;

const ErrorPageTextIcon = styled(ErrorPageTextIc)`
  width: 39.2rem;

  margin-bottom: 3rem;
`;

const DescriptionWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fonts.body1};
`;

const ContactTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 4rem;
  color: ${({ theme }) => theme.colors.gray3};

  ${({ theme }) => theme.fonts.hashtag};
`;

const TrackOneMainLogoIcon = styled(TrackOneMainLogoIc)`
  width: 26.3rem;

  cursor: pointer;
`;

const Header = styled.header`
  position: sticky;
  top: 0;

  padding: 5.9rem 7.5rem;
`;

const EmailLink = styled.a`
  margin-left: 1rem;

  color: ${({ theme }) => theme.colors.gray2};

  cursor: pointer;
`;
