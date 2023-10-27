import { useEffect, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import CustomButton from "../../@common/button/customButton";
import { theme } from "../../../style/theme";
import { useNavigate } from "react-router-dom";
import mainBannerImg from "../../../assets/image/mainBannerBackgroundImg.png";

export default function MainBanner() {
  const navigate = useNavigate();

  const bannerTexts = ["Tracks", "Vocals", "Producer"];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      textIndex === 2 ? setTextIndex(0) : setTextIndex(textIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [textIndex]);

  function handleMoveToSignup() {
    navigate("/signup");
  }

  return (
    <Styled.Container>
      <Styled.BannerWrapper>
        <Styled.BannerText>
          {"DISCOVER\nYOUR"}
          <Styled.AnimateTextWrapper>
            <p>{"LIMITLESS ("}</p>
            <Styled.AnimateText className="animated-tracks">{bannerTexts[textIndex]}</Styled.AnimateText>
            <p>{")"}</p>
          </Styled.AnimateTextWrapper>
        </Styled.BannerText>

        <Styled.BannerMenuWrapper>
          <Styled.BannerTrackMenu>{"◀ Track"}</Styled.BannerTrackMenu>
          <Styled.BannerSignupButtonWrapper>
            <CustomButton btnStyle={btnStyle} handleClickFunction={handleMoveToSignup}>
              {"Sing up for free"}
            </CustomButton>
          </Styled.BannerSignupButtonWrapper>
          <Styled.BannerVocalMenu>{"Vocal ▶"}</Styled.BannerVocalMenu>
        </Styled.BannerMenuWrapper>

        <Styled.DivisionLine />

        <Styled.BannerNoticeText>
          {`Track-1 offers a platform for you to freely express your musical potential.\nDiscover your collaborative musicians on Track-1 now.`}
        </Styled.BannerNoticeText>
      </Styled.BannerWrapper>
    </Styled.Container>
  );
}

const btnStyle: CSSProperties = {
  fontFamily: "Alexandria",
  fontWeight: 400,
  fontSize: "2.5rem",
  lineHeight: "normal",

  width: "27.6rem",
  height: "6.8rem",

  color: `${theme.colors.white}`,

  backgroundColor: `${theme.colors.main}`,
  borderRadius: "3.55rem",
};

const Styled = {
  Container: styled.section`
    width: 100%;

    padding-top: 14.3rem;
    margin-bottom: 14.3rem;
  `,

  BannerWrapper: styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 100%;
    height: 109.9rem;

    background: url(${mainBannerImg});
  `,

  BannerText: styled.h1`
    text-align: center;

    padding-top: 22.1rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.heading90};

    white-space: pre-line;
  `,

  BannerMenuWrapper: styled.ul`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 107.3rem;

    margin: 9.5rem 0;
    padding: 0 2.5rem;
  `,
  BannerSignupButtonWrapper: styled.div`
    position: absolute;
    left: 39.8rem;
  `,

  BannerTrackMenu: styled.li`
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
  `,

  BannerVocalMenu: styled.li`
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
  `,

  DivisionLine: styled.hr`
    width: 152.6rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.white};
  `,

  BannerNoticeText: styled.h4`
    text-align: center;
    white-space: pre-line;

    margin-top: 4rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.pretendard_text22};
  `,
  AnimateTextWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
  `,

  AnimateText: styled.span`
    width: 47.4rem;

    text-align: center;
    animation: animated-text 3s infinite;

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
  `,
};
