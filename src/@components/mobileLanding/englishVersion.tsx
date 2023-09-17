import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MobileEngBackgroundGradationIc1, MobileEngBackgroundGradationIc2, MobileHeadBackgroudnIc } from "../../assets";

export default function EnglishVersion() {
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);
  const [URL, setURL] = useState(`www.track1.site`);

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
        text: "Discover Your Limitless Track",
        url: URL,
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  }

  return (
    <KoreaVersionSection>
      <FrontContents>
        <TextField>
          <FirstTitle pageY={pageY}>
            We have <br />
            tons of vocals.
          </FirstTitle>
          <SecondTitle pageY={pageY}>We have tons of vocals.</SecondTitle>
          <Sub>Find the best vocals that fit your song.</Sub>
        </TextField>
        <GotoPCSection>
          <FirstSub pageY={pageY}>You can meet them via PC</FirstSub>
          <SecondSub pageY={pageY}>
            You can meet them
            <br /> via PC
          </SecondSub>
          <PcSaveButton className="eng-pc1" onClick={handleShareOtherWays}>
            Save the PC link
          </PcSaveButton>
        </GotoPCSection>
        <Audio></Audio>
        <GotoPCBottomSection>
          <PcSaveButton className="eng-pc2" onClick={handleShareOtherWays}>
            Save the PC link
          </PcSaveButton>
          <SmallPcComment>Access via PC or tablet.</SmallPcComment>
        </GotoPCBottomSection>
      </FrontContents>
      <MobileHeadBackgroudnIcon pageY={pageY} />
      <MobileEngBackgroundGradationIcon1 />
      <MobileEngBackgroundGradationIcon2 />
    </KoreaVersionSection>
  );
}

const GotoPCBottomSection = styled.section`
  margin-top: 170rem;

  text-align: center;
`;

const Audio = styled.div`
  width: 35.3rem;
  height: 19.8rem;
  background: #d9d9d9;

  margin-left: 2rem;
  margin-top: 4rem;
`;

const PcSaveButton = styled.button`
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  margin-top: 1.5rem;
  width: 21.5rem;
  height: 4.8rem;
  border-radius: 2.4rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.main};
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

const FirstTitle = styled.h1<{ pageY: number }>`
  font-family: Pretendard;
  font-size: ${({ pageY }) => (5 - 0.1 * pageY >= 5 ? 5 : pageY > 42 ? 3.3 : 5 - 0.1 * pageY)}rem;

  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  width: 33.6rem;

  display: ${({ pageY }) => (pageY >= 42 ? "none" : "flex")};
  flex-wrap: wrap;
`;

const SecondTitle = styled.h1<{ pageY: number }>`
  font-family: Pretendard;
  font-size: ${({ pageY }) => (5 - 0.1 * pageY <= 1.7 ? 1.7 : 5 - 0.1 * pageY >= 3.3 ? 3.3 : 5 - 0.1 * pageY)}rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  margin-bottom: -1rem;

  display: ${({ pageY }) => (pageY < 42 ? "none" : "block")};
`;

const FirstSub = styled.p<{ pageY: number }>`
  font-family: Pretendard;
  font-size: ${({ pageY }) => (0.1 * pageY <= 1.5 ? 1.5 : 0.1 * pageY >= 2.5 ? 2.5 : 0.1 * pageY)}rem;

  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  width: 45rem;
  text-align: center;

  display: ${({ pageY }) => (0.1 * pageY < 2.5 ? "flex" : "none")};

  justify-content: center;
  flex-wrap: wrap;
`;

const SecondSub = styled.p<{ pageY: number }>`
  font-family: Pretendard;

  font-size: ${({ pageY }) => (0.1 * pageY >= 5 ? 5 : 0.1 * pageY <= 2.5 ? 2.5 : 0.1 * pageY)}rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  width: 45rem;
  text-align: center;

  display: ${({ pageY }) => (0.1 * pageY < 2.5 ? "none" : "flex")};
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

const MobileHeadBackgroudnIcon = styled(MobileHeadBackgroudnIc)<{ pageY: number }>`
  width: 39.3rem;
  height: 29.1rem;
  /* 애니메이션 필요 */
  margin-top: ${({ pageY }) => (pageY <= 42 ? 14 - 0.253 * pageY : 3.86)}rem;
  margin-bottom: ${({ pageY }) => (pageY <= 42 ? 0.253 * pageY : 10.6)}rem;
`;

const MobileEngBackgroundGradationIcon1 = styled(MobileEngBackgroundGradationIc1)`
  width: 39.3rem;
  height: 137rem;
`;

const MobileEngBackgroundGradationIcon2 = styled(MobileEngBackgroundGradationIc2)`
  width: 39.3rem;
  height: 104.7rem;
`;

const Sub = styled.p`
  font-family: Pretendard;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;

  margin-top: 2rem;
  margin-bottom: 20rem;
`;
