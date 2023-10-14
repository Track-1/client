import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MobileHeadBackgroudnIc } from "../../assets";

export default function EnglishVersion() {
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () => documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  function handleScroll() {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  }

  function handleShareOtherWays() {
    if (navigator.share) {
      navigator.share({
        title: "Track-1",
        text: "Access via PC or tablet.",
        url: "https://www.track1.site",
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  }

  return (
    <KoreaVersionSection>
      <FrontContents>
        <TextField>
          <FirstTitle>
            We have <br />
            tons of vocals.
          </FirstTitle>
          <Sub>Find the best vocals that fit your song.</Sub>
        </TextField>
        <GotoPCSection>
          <SubTitle pageY={pageY}>
            You can meet
            <br />
            them via PC
          </SubTitle>
          <PcSaveButton className="eng-pc1" onClick={handleShareOtherWays} pageY={pageY}>
            Save the PC link
          </PcSaveButton>
        </GotoPCSection>
        <Video
          pageY={pageY}
          controls
          playsInline
          className="eng-video"
          poster="https://dtugo13y66fcg.cloudfront.net/default/sumbnail.png">
          <source src="https://dtugo13y66fcg.cloudfront.net/default/landingVideo_English.mp4" type="video/mp4" />
          aaa
        </Video>
        <GotoPCBottomSection>
          <PcSaveButton className="eng-pc2" onClick={handleShareOtherWays} pageY={pageY}>
            Save the PC link
          </PcSaveButton>
          <SmallPcComment>Access via PC or tablet.</SmallPcComment>
        </GotoPCBottomSection>
      </FrontContents>
      <MobileHeadBackgroudnIcon />
      {/* <MobileEngBackgroundGradationIcon1 />
      <MobileEngBackgroundGradationIcon2 /> */}
      <MobileEngBackgroundGradationIcon1
        src="https://dtugo13y66fcg.cloudfront.net/default/MobileEngBackgroundGradationIc1.svg"
        alt="사진"
        pageY={pageY}
        loading="lazy"
      />
      <MobileEngBackgroundGradationIcon2
        src="https://dtugo13y66fcg.cloudfront.net/default/MobileEngBackgroundGradationIc2.svg"
        alt="사진"
        loading="lazy"
      />
    </KoreaVersionSection>
  );
}

const GotoPCBottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170rem;

  text-align: center;
`;

const Show = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const Video = styled.video<{ pageY: number }>`
  width: 35.2rem;
  height: 19.8rem;
  background: #d9d9d9;

  margin-left: 2rem;
  margin-top: 4rem;

  display: ${({ pageY }) => (pageY >= 500 ? "block" : "none")};

  animation: ${Show} 2s ease-out;
`;

const PcSaveButton = styled.button<{ pageY: number }>`
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  margin-top: 2rem;
  width: 21.5rem;
  height: 4.8rem;
  border-radius: 2.4rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.main};

  display: ${({ pageY }) => (pageY >= 500 ? "block" : "none")};
  animation: ${Show} 2s ease-out;
`;

const SmallPcComment = styled.p`
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  display: block;

  margin-top: 1.5rem;
`;

const FirstTitle = styled.h1`
  font-family: Pretendard;
  font-size: 5rem;

  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  width: 33.6rem;

  display: flex;
  flex-wrap: wrap;
`;

const FontLarger = keyframes`
    0% {
     font-size:1.5rem;
     margin-top:7rem;
    }
    100% {
      font-size:5rem;
      margin-top:35rem;
    }
`;

const SubTitle = styled.p<{ pageY: number }>`
  font-family: Pretendard;

  /* animation: ${({ pageY }) => pageY > 30 && FontLarger} 2s ease-out; */

  margin-top: ${({ pageY }) => (0.07 * pageY >= 35 ? 35 : 0.07 * pageY <= 7 ? 7 : 0.07 * pageY)}rem;

  font-size: ${({ pageY }) => (0.03 * pageY >= 5 ? 5 : 0.03 * pageY <= 3.3 ? 3.3 : 0.03 * pageY)}rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  color: ${({ pageY, theme }) => (pageY <= 30 ? theme.colors.gray3 : theme.colors.white)};

  width: 100%;
  text-align: center;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FrontContents = styled.div`
  position: absolute;
  width: 39.3rem;

  margin-top: 12rem;
`;

const GotoPCSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextField = styled.div`
  padding-left: 2rem;
`;

const KoreaVersionSection = styled.section`
  color: ${({ theme }) => theme.colors.white};
`;

const MobileHeadBackgroudnIcon = styled(MobileHeadBackgroudnIc)`
  width: 39.3rem;
  height: 29.1rem;
  margin-top: 12rem;
  /* 애니메이션 필요 */
`;

const MobileEngBackgroundGradationIcon1 = styled.img<{ pageY: number }>`
  margin-top: ${({ pageY }) => (0.07 * pageY + 10 >= 47 ? 47 : 0.07 * pageY <= 1.5 ? 10 : 0.07 * pageY + 10)}rem;
  width: 39.3rem;
  height: 137rem;
`;

const MobileEngBackgroundGradationIcon2 = styled.img`
  width: 39.3rem;
  height: 104.7rem;
`;

const Sub = styled.p`
  font-family: Pretendard;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  margin-top: 2rem;
  margin-bottom: 20rem;
`;
