import styled from 'styled-components';
import aboutIntroImg from '../../assets/image/about/aboutIntroImg.png';
import aboutPurposeBackgroundImg from '../../assets/image/about/aboutPurposeBackgroundImg.png';

import trackSearchExampleImg from '../../assets/image/about/trackSearchExampleImg.png';
import vocalSearchExampleImg from '../../assets/image/about/vocalSearchExampleImg.png';
import desktopExampleImg from '../../assets/image/about/desktopExampleImg.png';
import Text from '../common/Text';
import { RightArrowIc } from '../../assets';
import { ImageWrapper } from '../common/Interface';
import { useRef } from 'react';

const SectionContainer = styled.section`
  position: relative;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;

  padding: 0 2.5rem;
`;

const BackgroundImg = styled.img`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

function AboutIntro(props: { handleMoveHowToUseSection: () => void }) {
  const { handleMoveHowToUseSection } = props;

  const introKoreanText =
    '예술은 창조에서 시작되고 창조는 영감에서 비롯됩니다. 머릿속에서 떠다니는 음악적 아이디어를 자유롭게 표현할 수 있도록 활발한 소통의 장을 마련하는 것이 우리의 목표입니다.';
  const introEnglishText =
    'Art begins with creation, and creation is born from inspiration. Our goal is to provide a vibrant platform for you to freely express the musical ideas floating in your mind, where you can bring fleeting musical concepts to life.';

  return (
    <SectionContainer>
      <BackgroundImg src={aboutIntroImg} />
      <MainTitle>
        <Text as="span" font="Alex_60_R" color="white" lineHeight="140%">
          {'Limitless\n Chance &\n Inspiration'}
        </Text>

        <Text as="span" font="Alex_30_R" color="white" margin="8rem 0 14.2rem">
          {'FOR MUSICIANS'}
        </Text>

        <div onClick={handleMoveHowToUseSection}>
          <Text as="span" font="Alex_18_R" color="white" lineHeight="160%">
            {'How to use'}
          </Text>
        </div>
        <ImageWrapper as="button" width={0.8} height={1.6}>
          <DownArrowIcon width={8} height={16} />
        </ImageWrapper>
      </MainTitle>

      <TextWrapper>
        <Text as="span" font="Pre_18_R" color="white" lineHeight="170%">
          {introKoreanText}
        </Text>
        <Text as="span" font="Pre_18_R" color="gray3" lineHeight="170%">
          {introEnglishText}
        </Text>
      </TextWrapper>

      <DesktopExampleImage src={desktopExampleImg} />
    </SectionContainer>
  );
}

const MainTitle = styled(TitleWrapper)`
  position: absolute;
  top: 0;
  text-align: center;

  margin-top: 4rem;
`;

const DownArrowIcon = styled(RightArrowIc)`
  transform: rotate(90deg);
`;

const DesktopExampleImage = styled(BackgroundImg)`
  margin: 10rem 0 15rem;
`;

function AboutPurpose() {
  const purposeKoreanTitle = 'Track-1은 뮤지션의\n잠재력을 펼치는 데에\n집중합니다';
  const purposeKoreanText_01 =
    '번뜩이는 악상이 하나의 예술작품으로 구현되는 과정을 더욱 원활히 하고, 보다 많은 예술가와 함께할 수 있도록 협업 기회를 제공합니다.';
  const purposeEnglishText_01 =
    'Track-1 focuses on unleashing the\npotential of musicians. We aim to streamline the process of\ntransforming a brilliant melody into a work\nof art and offer more collaborative\nopportunities by bringing artists together.';

  const purposeKoreanText_02 =
    '뮤직 트랙에 담긴 영감과 잠재력이 무한하듯, 눈 앞에 펼쳐진 가능성의 트랙도 끝이 없습니다. 작업실에서의 흥얼거림이 세상을 흔드는 파동이 될 수 있도록, 잠재된 수많은 트랙을 발견하고 세상 밖으로 꺼낼 수 있도록, 우리는 준비하고 기다립니다.';
  const purposeEnglishText_02 =
    'Just as the inspiration and potential within music tracks seem limitless, so does the endless potential of the tracks waiting before you. As the hums in your studio may create waves that shake the world, we are ready and waiting to help you discover and share countless hidden tracks with the world.';

  return (
    <SectionContainer>
      <AboutPurposeBackgroundImg src={aboutPurposeBackgroundImg} />
      <PurposeTextWrapper>
        <Text as="h1" font="Alex_30_SB" color="white" lineHeight="170%">
          {purposeKoreanTitle}
        </Text>

        <Text as="span" font="Pre_18_R" color="white" lineHeight="170%">
          {purposeKoreanText_01}
        </Text>
        <Text as="span" font="Pre_18_R" color="gray3" lineHeight="170%">
          {purposeEnglishText_01}
        </Text>
      </PurposeTextWrapper>

      <SloganWapper>{'DISCOVER\nYOUR\nLIMITLESS\nTRACK'}</SloganWapper>
      <TextWrapper>
        <Text as="span" font="Pre_18_R" color="white" lineHeight="170%">
          {purposeKoreanText_02}
        </Text>
        <Text as="span" font="Pre_18_R" color="gray3" lineHeight="170%">
          {purposeEnglishText_02}
        </Text>
      </TextWrapper>
    </SectionContainer>
  );
}

const AboutPurposeBackgroundImg = styled(BackgroundImg)`
  margin-top: 4.3rem;
`;

const PurposeTextWrapper = styled(TextWrapper)`
  position: absolute;
  top: 0;

  margin-top: 4.3rem;
`;

const SloganWapper = styled(TitleWrapper)`
  text-align: center;
  ${({ theme }) => theme.fonts.Alex_62_M};
  line-height: 130%;

  background: linear-gradient(180deg, rgba(82, 0, 255, 0) -27.31%, #5200ff 69.21%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-bottom: 10rem;
`;

function AboutHowToUse(props: { scrollRef: React.RefObject<HTMLTableSectionElement> }) {
  const { scrollRef } = props;
  const HowToUseKoreanText =
    'Track-1은 보컬과 프로듀서가 서로 협업할 뮤지션을 찾을 수 있는 플랫폼입니다.\n번뜩이는 악상이 하나의 예술작품으로 구현되는 과정을 더욱 원활히 하고, 보다 많은 예술가와 함께할 수 있도록 협업 기회를 제공합니다.';

  const HowToUseEnglishText =
    'Track-1 focuses on unleashing the potential of musicians.\nWe aim to streamline the process of transforming a brilliant melody into a work of art and offer more collaborative opportunities by bringing artists together.';

  const TrackSearchExampleKoreanText =
    '프로듀서가 업로드한 스케치곡에 보컬이 자신의 목소리를 입혀 댓글을 달 수 있어요. 내 곡에 가장 잘 맞는 보컬을 직관적으로 찾아보세요.';

  const TrackSearchExampleEnglishText =
    'Producers upload demo tracks. Vocalists can add their voice to the demo track they like and leave comments.';

  return (
    <>
      <GuideSection ref={scrollRef}>
        <TextWrapper>
          <GuideTitle>{'User Guideline'}</GuideTitle>
        </TextWrapper>
        <GuideVideo
          controls
          playsInline
          muted
          className="kor-video"
          poster="https://dtugo13y66fcg.cloudfront.net/default/sumbnail.png">
          <source src="https://dtugo13y66fcg.cloudfront.net/default/landingVideo_Korean.mp4" type="video/mp4" />
        </GuideVideo>
      </GuideSection>

      <HowToUseContainer>
        <HowToUseTitle>{'Collaboration\nPlatform\nfor Musicians'}</HowToUseTitle>
        <TextWrapper>
          <Text as="span" font="Pre_18_R" color="white" lineHeight="170%">
            {HowToUseKoreanText}
          </Text>
          <Text as="span" font="Pre_18_R" color="gray3" lineHeight="170%">
            {HowToUseEnglishText}
          </Text>
        </TextWrapper>
      </HowToUseContainer>

      <ExampleSection>
        <ExampleImage src={trackSearchExampleImg} />
        <TextWrapper>
          <Text as="h1" font="Pre_30_SB" color="white" lineHeight="130%">
            {'Listen for yourself'}
          </Text>

          <Text as="span" font="Pre_18_R" color="white" lineHeight="170%">
            {TrackSearchExampleKoreanText}
          </Text>
          <Text as="span" font="Pre_18_R" color="gray3" lineHeight="170%">
            {TrackSearchExampleEnglishText}
          </Text>
        </TextWrapper>
      </ExampleSection>

      <ExampleSection>
        <ExampleImage src={vocalSearchExampleImg} />
        <TextWrapper>
          <Text as="h1" font="Pre_30_SB" color="white" lineHeight="130%">
            {'Optimized\n for exploration'}
          </Text>

          <Text as="span" font="Pre_18_R" color="white" lineHeight="170%">
            {TrackSearchExampleKoreanText}
          </Text>
          <Text as="span" font="Pre_18_R" color="gray3" lineHeight="170%">
            {TrackSearchExampleEnglishText}
          </Text>
        </TextWrapper>
      </ExampleSection>
    </>
  );
}

const GuideSection = styled(SectionContainer)`
  padding: 20rem 0 15rem;
`;

const GuideTitle = styled.h2`
  margin-bottom: 2rem;

  ${({ theme }) => theme.fonts.Pre_18_SB};

  background: linear-gradient(180deg, #fff 5.34%, #dedede 30.71%, #bfbfbf 71.95%, #8e8e8e 111.07%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GuideVideo = styled.video`
  width: 100%;

  animation: showVideo 2s ease-out;

  @keyframes showVideo {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ExampleSection = styled(SectionContainer)`
  margin-bottom: 10rem;
`;

const ExampleImage = styled(BackgroundImg)`
  margin-bottom: 5rem;
  padding: 0 2.5rem;
`;

const HowToUseContainer = styled(SectionContainer)`
  margin-bottom: 15rem;
`;

const HowToUseTitle = styled.h1`
  text-align: center;
  ${({ theme }) => theme.fonts.Pre_40_SB};
  line-height: 150%;

  background: linear-gradient(180deg, rgba(82, 0, 255, 0) -27.31%, #5200ff 69.21%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-bottom: 10rem;
`;

export default function AboutContainer() {
  const howToUseSectionRef = useRef<HTMLTableSectionElement>(null);

  function handleMoveHowToUseSection() {
    howToUseSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <AboutSectionWrapper>
      <AboutIntro handleMoveHowToUseSection={handleMoveHowToUseSection} />
      <AboutPurpose />
      <AboutHowToUse scrollRef={howToUseSectionRef} />
    </AboutSectionWrapper>
  );
}

const AboutSectionWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;
`;
