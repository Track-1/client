import styled from "styled-components";
import aboutBackgroundImg from "../../assets/image/aboutBackgroundImg.png";
import laptopImg from "../../assets/image/laptopImg.png";

interface AboutUsProps {
  scrollRef: React.RefObject<HTMLTableSectionElement>;
}

export default function AboutUs(props: AboutUsProps) {
  const { scrollRef } = props;

  return (
    <Styled.AboutSection ref={scrollRef}>
      <Styled.AboutSectionWrapper>
        <Styled.AboutDescriptionText>
          {
            "예술은 창조에서 시작되고, 창조는 영감에서 비롯됩니다.\n머릿속에서 떠다니는 음악적 아이디어를 자유롭게 표현할 수 있도록\n활발한 소통의 장을 마련하는 것이 우리의 목표입니다."
          }
        </Styled.AboutDescriptionText>
        <Styled.SubDescriptionText>
          {
            "Art begins with creation, and creation is born from inspiration.\nOur goal is to provide a vibrant platform for you to freely express the musical ideas floating in your mind, where you can bring fleeting musical concepts to life."
          }
        </Styled.SubDescriptionText>

        <Styled.LaptopImage src={laptopImg} alt="about 배경 이미지" />
      </Styled.AboutSectionWrapper>

      <Styled.AboutSectionWrapper className="backgroundImg">
        <Styled.AboutDescriptionText className="text-center">
          {
            "Track-1은 뮤지션의 잠재력을 펼치는 데에 집중합니다.\n번뜩이는 악상이 하나의 예술작품으로 구현되는 과정을 더욱 원활히 하고,\n보다 많은 예술가와 함께할 수 있도록 협업 기회를 제공합니다."
          }
        </Styled.AboutDescriptionText>
        <Styled.SubDescriptionText className="text-center">
          {
            "Track-1 focuses on unleashing the potential of musicians.\nWe aim to streamline the process of transforming a brilliant melody into a work of art and offer more collaborative opportunities by bringing artists together."
          }
        </Styled.SubDescriptionText>

        <Styled.HeadingText className="purple">{"Discover your\nLimitless\nChance and inspiration"}</Styled.HeadingText>

        <Styled.AboutDescriptionText>
          {
            "뮤직 트랙에 담긴 영감과 잠재력이 무한하듯, 눈 앞에 펼쳐진 가능성의 트랙도 끝이 없습니다.\n작업실에서의 흥얼거림이 세상을 흔드는 파동이 될 수 있도록,\n잠재된 수많은 트랙을 발견하고 세상 밖으로 꺼낼 수 있도록, 우리는 준비하고 기다립니다."
          }
        </Styled.AboutDescriptionText>
        <Styled.SubDescriptionText>
          {
            "Just as the inspiration and potential within music tracks seem limitless, so does the endless potential of the tracks waiting before you.\nAs the hums in your studio may create waves that shake the world,\nwe are ready and waiting to help you discover and share countless hidden tracks with the world."
          }
        </Styled.SubDescriptionText>
      </Styled.AboutSectionWrapper>
    </Styled.AboutSection>
  );
}

const Styled = {
  Container: styled.main`
    width: 100%;
    height: 100%;
  `,

  TapMenuWrapper: styled.ul`
    display: flex;
    justify-content: center;

    width: 100%;

    margin-top: 57.6rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.alexandria_text30};
  `,

  TapMenu: styled.li`
    padding: 3rem 8rem;

    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.main};
    }
  `,

  DivisionLine: styled.hr`
    width: 100%;

    background: ${({ theme }) => theme.colors.white};

    &.tap-menu {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 50.02%, rgba(255, 255, 255, 0) 100%);
    }
  `,

  AboutSection: styled.section`
    width: 100%;
    height: 393rem;

    margin-top: 8rem;
  `,

  AboutSectionWrapper: styled.div`
    width: 100%;

    padding: 0 10rem;

    &.backgroundImg {
      position: absolute;
      background: url(${aboutBackgroundImg});
      background-repeat: no-repeat;
    }
  `,

  LaptopImage: styled.img`
    width: 100%;

    margin: 6.4rem 0 6.5rem;
  `,

  HeadingText: styled.h1`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.alexandria_heading98};

    margin: 38.8rem 0 2rem;

    white-space: pre-line;

    &.text-center {
      text-align: center;
    }

    &.purple {
      margin: 32.3rem 0;

      color: ${({ theme }) => theme.colors.main};
      ${({ theme }) => theme.fonts.alexandria_text148};

      text-align: right;
    }
  `,

  SubDescriptionText: styled.p`
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.pretendard_text25};

    letter-spacing: -0.025rem;

    white-space: pre-line;

    &.description {
      margin-top: 5rem;

      color: ${({ theme }) => theme.colors.gray2};
      font-weight: 500;
      line-height: 4.375rem;
      letter-spacing: -0.25px;
    }

    &.text-center {
      text-align: center;
    }
  `,

  AboutDescriptionText: styled.h2`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.pretendard_text40};

    margin-bottom: 6.4rem;

    white-space: pre-line;

    &.text-center {
      text-align: center;

      margin-top: 16.7rem;
    }
  `,
};
