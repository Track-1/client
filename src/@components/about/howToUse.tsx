import styled from "styled-components";
import commentExampleImg from "../../assets/image/commentExampleImg.png";
import vocalSearchExampleImg from "../../assets/image/vocalSearchExampleImg.png";

interface HowToUseProps {
  scrollRef: React.RefObject<HTMLTableSectionElement>;
}

export default function HowToUse(props: HowToUseProps) {
  const { scrollRef } = props;
  return (
    <Styled.HowtoSection ref={scrollRef}>
      <Styled.HowToSectionWrapper>
        <Styled.HowToTextWrapper>
          <Styled.HowToLeftTextWrapper>
            <Styled.HeadingText className="howTo_100">{"Collaboration\nPlatform\nfor Musicians"}</Styled.HeadingText>

            <Styled.HeadingText className="howTo_100">{"User Guideline"}</Styled.HeadingText>
          </Styled.HowToLeftTextWrapper>

          <Styled.HowToRightTextWrapper className="howTo_100">
            <Styled.SubDescriptionText className="howTo-section">
              {
                "Track-1은 보컬과 프로듀서가 서로 협업할 뮤지션을 찾을 수 있는 플랫폼입니다.\n원하는 느낌의 뮤지션을 편리하게 탐색할 수 있고,\n데모 작업을 통해 직관적으로 잘 맞는 뮤지션과 컨택할 수 있습니다.\nTrack-1에서 무궁무진한 협업의 기회를 얻어가세요."
              }

              <Styled.SubDescriptionText className="description">
                {
                  "Track-1 is a platform where vocalists and producers\ncan find fellow musicians to collaborate with.\nYou can conveniently explore musicians with the desired vibe and\neasily get in touch with those who are a perfect match through demo work.\nDiscover endless opportunities for collaboration on Track-1."
                }
              </Styled.SubDescriptionText>
            </Styled.SubDescriptionText>
          </Styled.HowToRightTextWrapper>
        </Styled.HowToTextWrapper>
      </Styled.HowToSectionWrapper>

      <Styled.Video
        controls
        playsInline
        autoPlay
        muted
        className="kor-video"
        poster="https://dtugo13y66fcg.cloudfront.net/default/sumbnail.png">
        <source src="https://dtugo13y66fcg.cloudfront.net/default/landingVideo_Korean.mp4" type="video/mp4" />
      </Styled.Video>

      <Styled.HowToSectionWrapper>
        <Styled.HeadingText className="howTo_90">{"Listen for yourself"}</Styled.HeadingText>
        <Styled.SubDescriptionText className="howTo-section">
          {
            "프로듀서가 업로드한 스케치곡에 보컬이 자신의 목소리를 입혀 댓글을 달 수 있어요.\n내 곡에 가장 잘 맞는 보컬을 직관적으로 찾아보세요."
          }
        </Styled.SubDescriptionText>

        <Styled.SubDescriptionText className="description">
          {
            "Producers upload demo tracks.\nVocalists can add their voice to the demo track they like and leave comments."
          }
        </Styled.SubDescriptionText>
        <Styled.CommentExampleImage src={commentExampleImg} alt="댓글 기능 예시 이미지" />

        <Styled.HowToTextWrapper>
          <Styled.HowToLeftTextWrapper>{}</Styled.HowToLeftTextWrapper>

          <Styled.HowToRightTextWrapper>
            <Styled.HeadingText className="howTo_90">{"Optimized\nfor exploration"}</Styled.HeadingText>
            <Styled.SubDescriptionText className="howTo-section">
              {
                "음악 장르를 필터링하고, 다른 뮤지션의 대표곡을 들어볼 수 있어요.\n원하는 느낌의 뮤지션을 빠르고 편리하게 찾아보세요!"
              }

              <Styled.SubDescriptionText className="description">
                {"Easily discover talented musicians who complement your style and sound."}
              </Styled.SubDescriptionText>
            </Styled.SubDescriptionText>
          </Styled.HowToRightTextWrapper>
        </Styled.HowToTextWrapper>
        <Styled.VocalSearchExampleImage src={vocalSearchExampleImg} alt="댓글 기능 예시 이미지" />
      </Styled.HowToSectionWrapper>
    </Styled.HowtoSection>
  );
}

const Styled = {
  HowtoSection: styled.section`
    width: 100%;

    margin-top: 35rem;
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

    &.howTo_100 {
      margin: 0;
      margin-bottom: 67.5rem;

      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fonts.alexandria_heading100};

      background: linear-gradient(109deg, #fff 40.49%, rgba(59, 60, 63, 0) 110.64%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &.howTo_90 {
      margin: 0;
      margin-bottom: 10rem;

      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fonts.alexandria_heading100};
    }
  `,

  SubDescriptionText: styled.p`
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.pretendard_text25};

    letter-spacing: -0.025rem;

    white-space: pre-line;

    &.main-section {
      color: ${({ theme }) => theme.colors.white};
      float: right;
    }

    &.howTo-section {
      color: ${({ theme }) => theme.colors.white};
      font-weight: 500;
      line-height: 4.5rem;
    }

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

  HowToSectionWrapper: styled.div`
    padding: 0 10rem;
  `,

  HowToTextWrapper: styled.div`
    display: flex;

    width: 100%;
    height: 100%;

    display: flex;
  `,

  HowToLeftTextWrapper: styled.div`
    width: 87.1rem;

    h1 {
      &:last-child {
        margin: 0;
      }
    }
  `,

  HowToRightTextWrapper: styled.div`
    width: calc(100% - 87.1rem);

    &.howTo_100 {
      padding-top: 35.1rem;
    }
  `,

  CommentExampleImage: styled.img`
    width: 100%;

    margin: 10rem 0 25rem;
  `,

  VocalSearchExampleImage: styled.img`
    width: 100%;

    margin: 10rem 0 20rem;
  `,

  Video: styled.video`
    width: 192rem;
    height: 108rem;

    margin: 10rem 0 35rem;

    animation: showVideo 2s ease-out;

    @keyframes showVideo {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `,
};
