import styled from "styled-components";
import mainSectionBackgroundImg from "../../assets/image/mainSectionBackgroundImg.png";

interface AboutMainProps {
  handleMoveAboutSection: () => void;
  handleMoveHowToSection: () => void;
}

export default function AboutMain(props: AboutMainProps) {
  const { handleMoveAboutSection, handleMoveHowToSection } = props;
  return (
    <Styled.MainSection>
      <Styled.MainSectionWrapper>
        <Styled.HeadingText>DISCOVER YOUR LIMITLESS TRACK</Styled.HeadingText>
        <Styled.SubDescriptionText>Limitless chance and inspiration for Musicians</Styled.SubDescriptionText>

        <Styled.TapMenuWrapper>
          <Styled.TapMenu onClick={handleMoveAboutSection}>About us</Styled.TapMenu>
          <Styled.TapMenu onClick={handleMoveHowToSection}>How to use</Styled.TapMenu>
        </Styled.TapMenuWrapper>
        <Styled.DivisionLine />
      </Styled.MainSectionWrapper>
    </Styled.MainSection>
  );
}

const Styled = {
  MainSection: styled.section`
    width: 100%;
    height: 143rem;

    background: url(${mainSectionBackgroundImg});
    /* background-size: 192rem; */
    background-repeat: no-repeat;
  `,

  MainSectionWrapper: styled.div`
    position: absolute;

    width: 100%;
    padding: 0 10rem;
    margin: auto;
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

    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 50.02%, rgba(255, 255, 255, 0) 100%);
  `,

  HeadingText: styled.h1`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.alexandria_heading98};

    margin: 38.8rem 0 2rem;

    text-align: center;

    white-space: pre-line;
  `,

  SubDescriptionText: styled.p`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.pretendard_text25};

    float: right;

    letter-spacing: -0.025rem;

    white-space: pre-line;
  `,
};
