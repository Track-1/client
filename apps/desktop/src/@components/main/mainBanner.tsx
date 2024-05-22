import styled from 'styled-components';
import mainBannerImg from '../../assets/image/mainBannerBackgroundImg.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayUseContext } from '../../context/playerContext';

export default function MainBanner() {
  const bannerTexts = ['Tracks', 'Chance', 'Inspiration'];

  const [textIndex, setTextIndex] = useState(0);
  const { quitAudioForMovePage } = PlayUseContext({});
  const navigate = useNavigate();

  function handleMoveVocalSearch() {
    quitAudioForMovePage();
    navigate('/vocal-search');
  }

  function handleMoveTrackSearch() {
    quitAudioForMovePage();
    navigate('/track-search');
  }

  function handleMoveToSignup() {
    navigate('/signup');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      textIndex === 2 ? setTextIndex(0) : setTextIndex(textIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [textIndex]);

  return (
    <Container>
      <BannerWrapper>
        <BannerText>
          {'DISCOVER\nYOUR'}
          <AnimateTextWrapper>
            <p>{'LIMITLESS ('}</p>
            <AnimateText className="animated-tracks">{bannerTexts[textIndex]}</AnimateText>
            <p>{')'}</p>
          </AnimateTextWrapper>
        </BannerText>

        <BannerMenuWrapper>
          <BannerTrackMenu onClick={handleMoveTrackSearch}>{'◀ Track'}</BannerTrackMenu>
          <BannerSignupButtonWrapper>
            <SignUpButton onClick={handleMoveToSignup}>{'Sing up for free'}</SignUpButton>
          </BannerSignupButtonWrapper>
          <BannerVocalMenu onClick={handleMoveVocalSearch}>{'Vocal ▶'}</BannerVocalMenu>
        </BannerMenuWrapper>

        <DivisionLine />

        <BannerNoticeText>
          {`Track-1 offers a platform for you to freely express your musical potential.\nDiscover your collaborative musicians on Track-1 now.`}
        </BannerNoticeText>
      </BannerWrapper>
    </Container>
  );
}

const SignUpButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Alexandria';
  font-weight: 400;
  font-size: 2.5rem;
  line-height: normal;

  width: 27.6rem;
  height: 6.8rem;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 3.55rem;
`;

const Container = styled.section`
  width: 100%;

  margin-bottom: 14.3rem;
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  height: 109.9rem;

  background: url(${mainBannerImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

const BannerText = styled.h1`
  text-align: center;

  padding-top: 22.1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.alexandria_heading90};

  white-space: pre-line;
`;

const BannerMenuWrapper = styled.ul`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 107.3rem;

  margin: 9.5rem 0;
  padding: 0 2.5rem;
`;
const BannerSignupButtonWrapper = styled.div`
  position: absolute;
  left: 39.8rem;
`;

const BannerTrackMenu = styled.li`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.alexandria_text30};

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.sub1};

    animation-name: slide-left-side;
    animation-duration: 0.5s;
    animation-duration: linear;
    animation-iteration-count: 2;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  @keyframes slide-left-side {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: 2.5rem;
    }
  }
`;

const BannerVocalMenu = styled.li`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.alexandria_text30};

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.sub2};

    animation-name: slide-right-side;
    animation-duration: 0.5s;
    animation-duration: linear;
    animation-iteration-count: 2;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  @keyframes slide-right-side {
    0% {
      margin-right: 0;
    }
    100% {
      margin-right: 2.5rem;
    }
  }
`;

const DivisionLine = styled.hr`
  width: 152.6rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.white};
`;

const BannerNoticeText = styled.h4`
  text-align: center;
  white-space: pre-line;

  margin-top: 4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.pretendard_text22};
`;
const AnimateTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 102.5rem;
`;

const AnimateText = styled.span`
  width: 47.4rem;

  text-align: center;
  animation: animated-text 4s infinite;

  @keyframes animated-text {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
